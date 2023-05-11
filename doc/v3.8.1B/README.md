## v3.8.1B_202208131451 更新说明
 
 日期 2022-08-13
 
 tag v3.8.1B_202208131451
 
 ### 需求更新内容：
 
 
 
 ### bug更新内容：
 
 1. fix: 🐛 #64050 【IPO配售对象】新增配售对象，有效日期输入长期有效或者今天，点击确定后，界面显示正常，再点击编辑
 
 ----------------------------------------------------------
 ## v3.8.1B_202208131817 更新说明
 
 日期 2022-08-13
 
 tag v3.8.1B_202208131817
 
 ### 需求更新内容：
 
 
 
 ### bug更新内容：
 
 1. fix: 🐛 #64070 【IPO配售对象】点击导入，上传txt、doc、pdf格式的文件，上传成功，预期提示“仅支持xls
2. fix: 🐛 #63798 【IPO配售对象】申购仓位比例（%），输入81.12，点击确定后，再次点击编辑，申购仓位比例（%）
3. fix: 🐛 #63732 【IPO配售对象】新增配售对象，可申购板块全选，申购仓位基准都为空，点击确认，提示申购仓位基准是必
4. fix: 🐛 #63771 【IPO配售对象】点击详情按钮，弹出配售对象详情，点击×，不生效，预期点击×关闭详情弹框。
5. fix: 🐛 #64010 【IPO配售对象】新增配售对象，托管席位（深）前端没有控制字段的可输入最大长度，预期前端控制最大可
6. fix: 🐛 #63993 【IPO配售对象】新增配售对象，资产证明文件类型默认为空，预期默认“无”。
 
 ----------------------------------------------------------
 ## v3.8.1B_202208171540 更新说明
 
 日期 2022-08-17
 
 tag v3.8.1B_202208171540
 
 ### 需求更新内容：
 
 1. feat: 🎸 #60867 新股IPO业务二期：业务流程（总任务）- 网下IPO交易 - 前端开发
2. feat: 🎸 #60863
3. feat: 接口定义
4. feat: 添加字典key
5. feat: 🎸 完成询价页面、入围页面、配售缴款页面的表头配置
6. feat: 调整表格左右边距
 
 ### bug更新内容：
 
 1. fix: 🐛 #64275 【IPO出资方信息】新增出资方信息11是非自有资金，然后穿透到下一层出资方为11-1也是非自有资金
2. fix: 🐛 #64222 【IPO出资方信息】新增出资方，出资方名称、营业执照号/统一社会信用代码/身份证号要控制最长128
3. fix: 🐛 #64428 【IPO配售对象】新增配售对象，申购板块全选，然后申购仓位基准（沪）、申购仓位基准（深）选择了数据
 
 ----------------------------------------------------------
 ## v3.8.1B_202208311638 更新说明
 
 日期 2022-08-31
 
 tag v3.8.1B_202208311638
 
 ### 需求更新内容：
 
 1. feat: 🎸 #60868 新股IPO业务二期：业务流程（总任务）- 网下IPO交易 - 联测
2. feat: #60863 新股IPO业务二期：业务流程（总任务）- 网下IPO投资 - 前端开发 http://ones.xuncetech.com:1111/project/#/team/DYq2NDCY/project/W1Cqa3AQHTXEnBbK/component/PRx7iWWN/view/WKky6a7B/task/5Dp2jhQk1PxjykCj
3. feat: 🎸 #67657 【IPO出资方信息】导入多个出资方信息后，界面自动勾选了新导入的数据，预期导入成功后，界面默认不
4. feat: 🎸 #67404 【IPO配售对象】新增配售对象时，选择已维护银行账号的产品，银行账号字段没有自动带出，需要手工选
5. feat: 🎸 #67443 【IPO出资方信息】营业执照号/统一社会信用代码/身份证号，目前没有控只能输入数字、字母128位
6. feat: 🎸 #60863
7. feat: 🎸 #64193 【IPO出资方】新增出资方，绝对出资比例（%）、相对出资比例（%）如果没有手工输入值时，需要自动
8. feat: #60863 新 股IPO业务二期：业务流程（总任务）- 网下IPO投资 - 前端开发 http://ones.xuncetech.com:1111/project/#/team/DYq2NDCY/project/W1Cqa3AQHTXEnBbK/component/PRx7iWWN/view/WKky6a7B/task/5Dp2jhQk1PxjykCj
9. feat: 🎸 #60867 新股IPO业务二期：业务流程（总任务）- 网下IPO交易 - 前端开发
10. feat: 公共组件维护
 
 ### bug更新内容：
 
 1. fix: 🐛 #67676 【IPO出资方信息】导入出资方信息，上传失败时，失败的信息应该放在上传结果中，不要放在合理性校验中
2. fix: 🐛 #61271
3. fix: 🐛 #61222
4. fix: #66851 【IPO新股报备】点击材料制作，保荐机构信息中的页面展示布局不合理，预期配售对象出资方基本信息表字段列宽加大，一行展示完全。 http://ones.xuncetech.com:1111/project/#/team/DYq2NDCY/project/W1Cqa3AQHTXEnBbK/component/GnQcHG25/view/Q5iPpWQS/task/Rov9fmkLwSV9DVqO
5. fix: 打开按钮权限
6. fix: #66641 【IPO新股报备】新股报备材料制作模式为2：仅是否参与为是的配售对象，点击材料制作，产品全部不勾选时，点击生成并导出，把所有的参与的配售对象的信息导出来了，预期没有勾选产品时提示参与产品列表不能为空，没有文件导出来。 http://ones.xuncetech.com:1111/project/#/team/DYq2NDCY/project/W1Cqa3AQHTXEnBbK/component/GnQcHG25/view/Q5iPpWQS/task/Rov9fmkLZMLklSyN
7. fix: #65138 【IPO新股报备】点击查看按钮，参与组合中，配售对象编码（交易所）取值错误，取成了自定义编号的值，预期展示正确的配售对象编码（交易所）的值。 http://ones.xuncetech.com:1111/project/#/team/DYq2NDCY/project/W1Cqa3AQHTXEnBbK/component/GnQcHG25/view/Q5iPpWQS/task/Rov9fmkLN72X2KDJ
8. fix：#61208 【IPO模板管理】模板核对，文件上传后，点击确定，核对结果展示页面显示模板不一致，没有提示信息，预期模板不一致右边有个❓提示如需更新模板，请联系IT人员维护最新的模板。 http://ones.xuncetech.com:1111/project/#/team/DYq2NDCY/project/W1Cqa3AQHTXEnBbK/component/GnQcHG25/view/Q5iPpWQS/task/Rov9fmkLWpSiIuS5
9. fix: #61195  【IPO模板管理】模板核对，点击批量上传，上传成功后，点击确定，到核对结果界面，然后点击返回，返回到批量上传界面，上传成功的进度条被清空了，预期上传成功的进度条是100%的进度，详情看附件视频。 http://ones.xuncetech.com:1111/project/#/team/DYq2NDCY/project/W1Cqa3AQHTXEnBbK/component/GnQcHG25/view/Q5iPpWQS/task/Rov9fmkLwL2l5ZsP
10. fix: #61241 【IPO模板管理】模板信息，点击查看/编辑按钮，模块预览字段应该改为模板预览，未维护时，用红字表示。 http://ones.xuncetech.com:1111/project/#/team/DYq2NDCY/project/W1Cqa3AQHTXEnBbK/component/GnQcHG25/view/Q5iPpWQS/task/Rov9fmkLaT42VkNH
11. fix: #61245 【IPO模板管理】模板信息，点击编辑，如果模板未维护，删除按钮应该置灰，目前没有置灰。 http://ones.xuncetech.com:1111/project/#/team/DYq2NDCY/project/W1Cqa3AQHTXEnBbK/component/GnQcHG25/view/Q5iPpWQS/task/Rov9fmkL1mXbGxbA
12. fix: #62431 【IPO模板管理】模板信息界面，点击查看，点击预览，弹出预览框，有取消和确定两个按钮，两个按钮的返回的结果一致，预期去掉取消按钮，保留确定按钮 http://ones.xuncetech.com:1111/project/#/team/DYq2NDCY/project/W1Cqa3AQHTXEnBbK/component/GnQcHG25/view/Q5iPpWQS/task/Rov9fmkL57ePus4j
13. fix: #63597 【IPO新股报备】点击材料制作，材料制作界面配售对象出资方基本信息表字段没有展示完全，预期展示完整字段名称。 http://ones.xuncetech.com:1111/project/#/team/DYq2NDCY/project/W1Cqa3AQHTXEnBbK/component/GnQcHG25/view/Q5iPpWQS/task/Rov9fmkLyuX6iYqX
14. fix: #63606 【IPO新股报备】点击置已完成，弹出二次确认框，二次确认框中的标题和内容展示不符合ued，预期标题和内容均为12号字体，且标题加粗。 http://ones.xuncetech.com:1111/project/#/team/DYq2NDCY/project/W1Cqa3AQHTXEnBbK/component/GnQcHG25/view/Q5iPpWQS/task/Rov9fmkL3Fr8dTfq
15. fix: #63833 【IPO新股报备】点击查看，参与组合信息中，产品名称显示的是产品全称，预期显示产品简称。 http://ones.xuncetech.com:1111/project/#/team/DYq2NDCY/project/W1Cqa3AQHTXEnBbK/component/GnQcHG25/view/Q5iPpWQS/task/Rov9fmkLofj1gskx
16. fix: #66373 【IPO新股报备】点击查看，资产规模日期，点击编辑，修改日期未生效，预期修改日期成功。 http://ones.xuncetech.com:1111/project/#/team/DYq2NDCY/project/W1Cqa3AQHTXEnBbK/component/GnQcHG25/view/Q5iPpWQS/task/Rov9fmkL99wtdq4B
17. fix: 🐛 #66661 【IPO出资方信息】导入出资方模板，全部上传成功，全部校验通过，导入结果中显示上传成功X条， 上传
18. fix: 🐛 #64742 【IPO出资方信息】新增出资方信息后，点击提交，提示“该配售对象出资方绝对出资比例之和为100.0
19. fix: 🐛 #64592 【IPO出资方信息】新增出资方，配售对象名称下拉框中要展示为已维护配售对象对应的产品简称，选择之后
20. fix: 🐛 #65544 【IPO配售对象】新增配售对象，证券帐号（沪）、证券帐号（深），目前展示的是股东名称，预期展示股东
21. fix: 🐛 #65573 【IPO配售对象】新增配售对象，证券帐号（沪）、证券帐号（深）都只有一个账号时，没有自动带出来，预
22. fix: 🐛 #63764 【IPO配售对象】新增配售对象后，界面列表展示、详情中的产品代码/产品名称显示的是产品代码+产品全
23. fix: 🐛 #64463 【IPO出资方信息】导入时，绝对出资比例之和等于、不等于相对出资比例之和，有提示信息展示，点击确定
 
 ----------------------------------------------------------
 