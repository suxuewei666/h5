## 前言

项目使用<u>[yarn](https://yarnpkg.com/cli)</u>进行项目管理,<u>[Vue](https://cn.vuejs.org/guide/introduction.html)</u>, <u>[VueRouter](https://router.vuejs.org/zh/guide/)</u>, <u>[Pinia](https://pinia.web3doc.top/introduction.html)</u>, <u>[Vant](https://vant-contrib.gitee.io/vant/#/zh-CN/home)</u> 已添加自动导入，可直接使用，无需手动导入。

## 安装运行

```bash
// 安装项目依赖
yarn

// 运行
yarn run dev
```

## 代码提交规范
``` text
type(scope): subject
```

type(必须):用于说明git commit的类别，只允许使用下表的标识
scope(可选):scope用于说明 commit 影响的范围，比如权限、订单、商品等等，视项目不同而不同。
subject(必须):subject是commit目的的简短描述，不超过50个字符。
示例: `docs: 新增markdown文档` or `feat(students): 新增学生模块添加学生功能`

| Type     | 作用                                                                                   |
| -------- | --------------------------------------------------------------------------------------|
| feat     | 新增功能                                                                                |
| fix      | bug修复                                                                                |
| style    | 不影响程序逻辑的代码修改(修改空白字符，补全缺失的分号等)                                        |
| test     | 新增测试用例或是更新现有测试                                                                |
| refactor | 重构代码(既没有新增功能，也没有修复 bug)                                                     |
| perf     | 性能优化                                                                                |
| build    | 主要目的是修改项目构建系统(例如 vite, glup，webpack，rollup 的配置等)的提交                     |
| docs     | 文档更新 (documentation)                                                                |
| ci       | 主要目的是修改项目继续集成流程(例如 Travis，Jenkins，GitLab CI，Circle等)的提交                 |
| revert   | 回滚某个更早之前的提交                                                                     |
| chore    | 不属于以上类型的其他类型(日常事务)                                                           |


## 代码部署相关

```bash
// 测试环境编译
yarn run build:test

// 正式环境编译
yarn run build
```
不同的编译命令对应相应的.env文件，插件会自动将.env文件配置的环境变量生成至`public/config.js`目录,运维同学可修改该文件来变更项目的配置。