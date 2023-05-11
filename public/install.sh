#!/bin/bash
# 用于安装子系统 单端口
baseDic="/data/xc-microfront";
subSysName="xone-ipo";

# 清除资源目录
if [ ! -d $baseDic ]
  then mkdir ${baseDic};
fi;

subSysPath="${baseDic}/xc-${subSysName}";

if [ ! -d $subSysPath ];
  then mkdir $subSysPath;
else 
  rm -rf "$subSysPath/*";
fi;

# 将nginx配置移到对应的目录
nginxDir="/etc/nginx";
subNginxDir="micro-web";


if [ ! -d "${nginxDir}/${subNginxDir}" ] 
  then mkdir "${nginxDir}/${subNginxDir}";
fi;

mv "./dist/${subSysName}-single.conf" "${nginxDir}/${subNginxDir}";

# 将资源copy过去
echo $subSysPath;

cp -af ./dist/* $subSysPath;

echo "子系统${subSysName}安装成功！请修改ngin配置后重启。";

