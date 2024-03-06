# resume-json-pdf

中文文档 | [README in English](./README-EN.md)

**本地 “沉浸式” 编写 JSON 文件，在线生成 PDF / HTML 简历 📄**

## 🔥 功能介绍

- **支持多个模板**：目前提供含照片和无照片的中英文版本
- **支持引入图标**：参考 [react-icons](https://react-icons.github.io/react-icons/) 库
- **支持文字加粗**：details 字段中使用双星号包裹，比如 “ ** 优化 xxx ** ” 会被渲染成 “ **优化 xxx** ”
- **支持链接跳转**：value 和 subtitle 字段使用 “http” 或者 “https” 开头，比如 “https: \//github.com/RylanBot” 会被渲染成 “[github.com/RylanBot](https://github.com/RylanBot)”
- **支持技术栈拆分**：tech 字段中使用加号连接，比如 “React+TypeScript+Tailwind CSS” 会被渲染成 “_`React` `TypeScript` `Tailwind CSS`_”
- **支持自定义颜色**：在线挑选并预览你喜欢的样式
- **支持自定义排版**：“一段实习+三个项目”或者“两段实习+两个项目”，或者额外引入“发表论文”等分区，保证整齐即可。文字内容较少时，通过调节部分边距使页面布局合理

## 🧙🏻 快速上手

### 🔮 开箱即用

[![Live Demo](https://img.shields.io/badge/Live%20Demo-点击查看-lightseagreen?style=for-the-badge&logo=vercel)](https://project.resume-json-pdf.rylan.cn/)

**在线导出 JSON 模板 → 本地修改数据 → 上传修改后的 JSON 文件 → 在线导出 PDF / HTML 简历**  

> [!Tip]  
> **引入了简单的在线编辑文字的功能 → 设置模式下点击相关文字**  

这个项目的开发初衷是为了制作简历时能更关注于文字本身，不纠结页面表单的填写和样式的排版，并实现最大程度的动态拓展。更推荐本地填写，在线微调，暂时未支持复杂的在线增删功能。

#### 参数说明

- 缺少某个字段不会报错，但页面相应部分渲染为空白，可能导致排版错位

- 注意 JSON 格式规范，缺少括号逗号等情况会导入失败

**Profile**  
| 字段 | 含义 | 备注 |
| :--- | :--- | :--- |
| name | 名字 | |
| avatar | 照片 | 在线上传默认转为 Base64 储存，本地可以修改为图床对应的链接 |
| footnote[] | 附加说明 | { "label": "标签", "content": "内容" } |
| contact[] | 联系方式 | { "icon": "图标", "key": "键", "value": "值" } |

**Experience[ ]**  
| 字段 | 含义 | 备注 |
| :--- | :--- | :--- |
| section | 分区 | |
| icon | 图标 | |
| items[] | 经历 | { "title": "标题", "subtitle": "副标题", "timeline": "时间线", "tech": "技术栈", <br> "details": [ "描述内容" ] } |

**Style**  
| 字段 | 含义 | 备注 |
| :--- | :--- | :--- |
| template | 模板 | avatar / plain |
| color | 颜色 | 16 进制格式 |
| pagePy | 简历页面 上下内边距 | number |
| profileMb | 个人信息 下外边距 | number |
| experienceMb | 经历部分 下外边距 | number |
| plainFootPx | 附加说明 左右内边距 | number（只对 plain 模板有效）|
| plainContactPx | 联系方式 左右内边距 | number（只对 plain 模板有效）|
| detailsFont | 描述内容 字体大小 | number |

### 🔮 二次开发

<p>
  <img src="https://img.shields.io/badge/node-20.x-green" alt="node version"/>
  <img src="https://img.shields.io/badge/npm-10.x-red" alt="npm version"/>
  <img src="https://img.shields.io/badge/yarn-1.x-blue" alt="yarn version"/>
</p>

如果你熟悉 Web 前端技术且对源码感兴趣，可以根据以下命令，在本地启动这个程序

```sh
npm install # or 'yarn'
npm run dev
```

## 🌷 效果预览

![resume-json-pdf-avatar-cn](https://s2.loli.net/2024/01/08/9ucs62Y4fEZkASB.png)

---

![resume-json-pdf-plain-cn](https://s2.loli.net/2024/01/08/H1X72sIriJMk3Tq.png)
