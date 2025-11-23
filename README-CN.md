# <img alt="Logo" src="./public/favicon.ico" width="35"/> resume-json-pdf

[English](./README.md) | 简体中文

## 🔥 功能介绍

### 💕 支持 Markdown 语法
（以下语法均可以嵌套使用）
- **斜体文字**： \*斜体\* 会被渲染成 *斜体* 
- **加粗文字**：\*\*加粗\*\* 会被渲染成 **加粗**
- **行内代码块**： \`React\` \`TypeScript\` \`Tailwind CSS\` 会被渲染成 `React` `TypeScript` `Tailwind CSS`
- **链接跳转**：https:\// github.com/RylanBot 会被渲染成 [github.com/RylanBot](https://github.com/RylanBot)

### 💕 支持自定义样式
- **模板**：含照片和无照片的版本
- **图标**：参考 [Font Awesome](https://fontawesome.com/icons) 库
- **字体**：挑选或输入任何本地字体
- **颜色**：使用取色器
- **排版**：调节边距使页面布局合理

## 🧙🏻 快速上手

### 🔮 开箱即用

[![在线示例](https://img.shields.io/badge/在线示例-点击查看-lightsteelblue?style=for-the-badge&logo=vercel)](https://project.resume-json-pdf.rylan.cn/)

#### 参数说明

- 缺少某个字段不会报错，但页面相应部分渲染为空白，可能导致排版错位

- 注意 JSON 格式规范，缺少括号逗号等情况会导入失败

**Profile**  
| 字段 | 含义 | 备注 |
| :--- | :--- | :--- |
| name | 名字 | |
| avatar | 照片 | 在线上传默认转为 Base64 储存，本地可以修改为图床对应的链接 |
| footnote[] | 附加说明 | |
| contact[] | 联系方式 | { "icon": "图标", "value": "值" } |

**Experience[ ]**  
| 字段 | 含义 | 备注 |
| :--- | :--- | :--- |
| page | 页数 | 默认为 1 |
| section | 分区 | |
| icon | 图标 | |
| items[] | 经历 | { "title": "标题", "subtitle": "副标题", "timeline": "时间线", "tech": "技术栈", <br> "details": [ "描述内容" ] } |

**Style**  
| 字段 | 含义 | 备注 |
| :--- | :--- | :--- |
| template | 模板 | `avatar` / `plain` |
| fontStyle | 字体 | 任何本地字体名（在线挑选有限） |
| color | 颜色 | 16 进制格式 |
| pagePy | 简历页面 上下内边距 | Number |
| profileMb | 个人信息 下外边距 | Number |
| experienceMb | 经历部分 下外边距 | Number |
| plainFootPx | 附加说明 左右内边距 | Number（只对 `plain` 模板有效）|
| plainContactPx | 联系方式 左右内边距 | Number（只对 `plain` 模板有效）|
| detailsFont | 经历部分 字体大小 | Number |

### 🔮 二次开发

如果你熟悉 Web 前端技术且对源码感兴趣，可以根据以下命令，在本地启动这个程序：

```sh
npm install
npm run dev
```

## 🌷 效果预览

![头像模板](https://s2.loli.net/2024/04/21/VD2dbJneyHAuZOW.png)

---

![普通模板](https://s2.loli.net/2024/04/21/3oanYrBTEsqgSKJ.png)
