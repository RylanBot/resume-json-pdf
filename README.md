# resume-json-pdf

English | [简体中文](./README-CN.md) 

**Edit JSON files locally for an engaging writing process and obtain PDF / HTML resumes online 📄**

## 🔥 Feature

### 💕 Support Markdown Syntax
(The following syntax can be nested)
- **Italic text**: \*Italic\* will be rendered as *Italic* 
- **Bold text**: \*\*Bold\*\* will be rendered as **Bold**
- **Inline code blocks**: \`React\` \`TypeScript\` \`Tailwind CSS\` will be rendered as `React` `TypeScript` `Tailwind CSS`
- **Links**: https:\// github.com/RylanBot will be rendered as [github.com/RylanBot](https://github.com/RylanBot)

### 💕 Support Custom Styles
- **Templates**: Versions with and without photos
- **Icons**: Refer to the [Font Awesome](https://fontawesome.com/icons) library
- **Fonts**: Default (Times) or Noto Serif SC
- **Colors**: Use a color picker to select
- **Layout**: Adjust margins for a reasonable page design

## 🧙🏻 Quick Start

### 🔮 Ready to Use

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Click%20for%20visist-lightseagreen?style=for-the-badge&logo=vercel)](https://project.resume-json-pdf.rylan.cn/)

**Export JSON template online → Modify data locally → Upload modified JSON File → Export PDF / HTML resume online**

> [!Tip]  
> **Introduced a simple online text editing feature → Click on the relevant text in the setting mode**

The original intention of this project is to focus more on the content of the resume itself, without worrying about filling out page forms and formatting styles, and to achieve maximum dynamic expansion. It is recommended to fill out locally, fine-tune online, and currently does not support complex online adding and deleting functions.

#### Parameter

- Missing a certain field won't result in an error, but the corresponding part will be rendered as blank, potentially causing layout issues.

- Pay attention to JSON format specifications; missing parentheses, commas, etc., can lead to import failures.

**Profile**  
| Field | Meaning | Note |
| :--- | :--- | :--- |
| name | | |
| avatar | | Uploaded online defaults to Base64 storage or modified locally to a image link |
| footnote[] | | |
| contact[] | | { "icon": "", "value": "" } |

**Experience[ ]**  
| Field | Meaning | Note |
| :--- | :--- | :--- |
| section | | |
| icon | | |
| items[] | | { "title": "", "subtitle": "", "timeline": "", "tech": "", "details": ["", ""] } |

**Style**  
| Field | Meaning | Note |
| :--- | :--- | :--- |
| template | | avatar / plain |
| fontStyle | | default / fancy |
| color | | Hexadecimal |
| pagePy | Resume Padding Y | Number |
| profileMb | Profile Margin bottom | Number |
| experienceMb | Experience Margin bottom | Number |
| plainFootPx | Footnote Padding X | Number (only valid for the plain template) |
| plainContactPx | Contact Padding X | Number (only valid for the plain template) |
| detailsFont | Experience Section Font Size | number |

### 🔮 For Development

<p>
  <img src="https://img.shields.io/badge/node-20.x-green" alt="node version"/>
  <img src="https://img.shields.io/badge/npm-10.x-red" alt="npm version"/>
  <img src="https://img.shields.io/badge/yarn-1.x-blue" alt="yarn version"/>
</p>

If you are familiar with Web frontend technologies and are interested in the source code, you can run this program using the following commands.

```sh
npm install # or 'yarn'
npm run dev
```

## 🌷 Preview

![resume-json-pdf-avatar-en](https://s2.loli.net/2024/04/21/6sS5EQIpol7vPzW.png)

---

![resume-json-pdf-plain-en](https://s2.loli.net/2024/04/21/hSBOZIYumoEDd14.png)