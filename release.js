/**
 * 自动发布新版本脚本
 *
 * 操作步骤
 * 1. 输入开始范围，只支持输入版本号，自动校验输入的值是否合理
 * 2. 输入结束范围，继承 git 原生支持范围, 默认为 HEAD
 * 3. 输入新版本号名称，自动校验输入的值是否合理
 */
const colors = require('colors/safe');
const readline = require('readline');
const fs = require('fs');
const path = require('path');
const simpleGit = require('simple-git')(path.resolve());
const inquirer = require('inquirer');

const prompt = inquirer.createPromptModule();

const rl = readline.createInterface(process.stdin, process.stdout);
const OUTPUT_DIR = 'doc/{{version}}';
const TEMPLATE = `## {{version}} 更新说明
 
 日期 {{date}}
 
 tag {{version}}
 
 ### 需求更新内容：
 
 {{feat}}
 
 ### bug更新内容：
 
 {{bug}}
 
 ----------------------------------------------------------
 `;

const HEADTEMPLATE = `# {{version}} 更新说明
 
 范围:
 
 版本: {{version}}
 
 作者:
 
 日期: {{date}}
 
 ----------------------------------------------------------
 `;

function padStr(s, len = 2) {
  return `${s}`.padStart(len, '0');
}

function logError(err) {
  console.log(`
     ${colors.rainbow('打包失败')}
     ${colors.brightRed(err)}
   `);
}

const choices = [
  {
    name: '正常模式: (v_xxxx)',
    value: 'normalMode',
  },
  {
    name: '补丁模式: (v_xxxx_xxxx)',
    value: 'patchMode',
  },
  {
    name: '自定义',
    value: 'self',
  },
];

const question = {
  type: 'confirm',
  name: 'result',
  message: '确定吗',
  default: 'yes',
  choices: [
    { name: 'yse', value: 'yes' },
    { name: 'no', value: 'no' },
  ],
};

//当前时间戳
const _date = new Date();
const currentDate = `${_date.getFullYear()}${padStr(
  _date.getMonth() + 1,
)}${padStr(_date.getDate())}${padStr(_date.getHours())}${padStr(
  _date.getMinutes(),
)}`;

let suffix = '';
/**
 * 提交文档&生成tag
 *
 * @param {*} dirPath
 * @param {*} version
 */
function commitFile(dirPath, version) {
  const commitMsg = `
 docs: release
 
 ${version} 发布版本文档
 `;
  simpleGit
    .add(dirPath)
    .commit(commitMsg)
    .push('origin')
    .tag([version])
    .push('origin', version, () => {
      const versionText = `版本号为：${version}`;
      console.log(`
       ${colors.rainbow('打包成功')}
       ${colors.brightYellow('tag 已生成并推送至远程')}
       ${colors.brightRed(versionText)}
     `);
    });
}

/**
 * 生成文件内容
 *
 * @param {*} list
 * @param {*} version
 */
function generateFile(list, version) {
  const d = new Date();
  const afterList = [
    ...new Set(list.map((item) => `${item.message.trimStart()}`)),
  ];

  const bugs = afterList
    .filter((e) => /fix/.test(e))
    .map((v, index) => `${index + 1}. ${v}`);
  const feats = afterList
    .filter((e) => /feat/.test(e))
    .map((v, index) => `${index + 1}. ${v}`);
  const chore = afterList
    .filter((e) => /chore/.test(e))
    .map((v, index) => `${index + 1}. ${v}`);

  const content = TEMPLATE.replace(/{{version}}/g, version)
    .replace(
      /{{date}}/g,
      [d.getFullYear(), padStr(d.getMonth() + 1), padStr(d.getDate())].join(
        '-',
      ),
    )
    .replace(/{{feat}}/, feats.join('\n'))
    .replace(/{{bug}}/, bugs.join('\n'))
    .replace(/{{chore}}/, chore.join('\n'));
  // const dirPath = path.resolve(OUTPUT_DIR.replace(/{{version}}/, version));
  const dirPath = path.resolve(
    `${OUTPUT_DIR.replace(
      /{{version}}/,
      version.substring(0, version.indexOf('_')),
    )}${suffix ? `_${suffix}` : ''}`,
  );
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
    const headContent = HEADTEMPLATE.replace(
      /{{version}}/g,
      version.substring(0, version.indexOf('_')),
    ).replace(
      /{{date}}/g,
      [d.getFullYear(), padStr(d.getMonth() + 1), padStr(d.getDate())].join(
        '-',
      ),
    );
    const fullCotent = headContent + content;
    fs.writeFileSync(`${dirPath}/README.md`, fullCotent);
  } else {
    fs.appendFileSync(`${dirPath}/README.md`, content);
  }
  commitFile(dirPath, version);
}

function getGitLog(from, to, version) {
  simpleGit.log(
    {
      from,
      to: to || 'HEAD',
    },
    (err, result) => {
      if (err) {
        console.log(colors.red('读取 Git 日志失败', err));
        return;
      }
      generateFile(result.all, version);
    },
  );
}
rl.question('请输入开始范围: ', (from) => {
  if (!from) {
    logError('请输入开始范围');
    rl.close();
    return;
  }
  const versionReg = /^v(\d+\.){2}\d+[A-Z]?$/;
  const versionRegInput = /v(\d+\.){2}\d+[A-Z]?_\d+\w*/;
  if (!versionRegInput.test(from)) {
    logError('开始范围 tag 版本号输入格式不正确');
    rl.close();
    return;
  }
  rl.question('请输入结束范围(默认为HEAD): ', (to) => {
    const currentHead = from.split('_')?.[0] || '';
    rl.question(`新版本号(默认为${currentHead})?\n`, (v) => {
      let version = v || currentHead;
      if (!version) {
        logError('请输入新版本号');
        rl.close();
        return;
      }
      if (!versionReg.test(version)) {
        logError('新版本号 tag 输入格式不正确');
        rl.close();
        return;
      }
      inquirer
        .prompt([
          {
            type: 'list',
            name: 'choiceVersion',
            choices,
            default: 'normal',
          },
        ])
        .then((answers) => {
          version = `${version}_${currentDate}`;
          if (answers['choiceVersion'] === 'normalMode') {
            // 正常模式
            const message = `确定tag为: ${version} 吗？`;
            question.message = message;
            prompt(question).then((res) => {
              if (res.result === true) {
                getGitLog(from, to, version);
                rl.close();
              } else {
                rl.close();
              }
            });
          } else if (answers['choiceVersion'] === 'patchMode') {
            // 补丁模式
            version = `v3.8.0F_202206302117_${currentDate}`;
            const message = `确定tag为: ${version} 吗？`;
            question.message = message;
            prompt(question).then((res) => {
              if (res.result === true) {
                getGitLog(from, to, version);
                rl.close();
              } else {
                rl.close();
              }
            });
          } else if (answers['choiceVersion'] === 'self') {
            // 自定义模式
            prompt({
              type: 'input',
              default: version,
              message: '请输入tag号',
              name: 'selfTag',
              validate: (val) => {
                if (!val) {
                  return '请输入tag号';
                }
                return true;
              },
            }).then((tagObj) => {
              const tag = tagObj.selfTag;
              const message = `确定tag为: ${tag} 吗？`;
              question.message = message;
              prompt(question).then((res) => {
                if (res.result === true) {
                  getGitLog(from, to, tag);
                  rl.close();
                } else {
                  rl.close();
                }
              });
            });
            return;
          }
        });
    });
  });
});
