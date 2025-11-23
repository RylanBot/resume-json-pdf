# <img alt="Logo" src="./public/favicon.ico" width="35"/> resume-json-pdf

English | [简体中文](./README-CN.md) 

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
- **Fonts**: Select or input any local font
- **Colors**: Use a color picker
- **Layout**: Adjust margins for a reasonable page design

## 🧙🏻 Quick Start

### 🔮 Ready to Use

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Click%20To%20View-lightsteelblue?style=for-the-badge&logo=vercel)](https://project.resume-json-pdf.rylan.cn/)

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
| page | Page Number | Default is 1 |
| section | | |
| icon | | |
| items[] | | { "title": "", "subtitle": "", "timeline": "", "tech": "", "details": ["", ""] } |

**Style**  
| Field | Meaning | Note |
| :--- | :--- | :--- |
| template | | `avatar` / `plain` |
| fontStyle | | Any local font name (online selection limited) |
| color | | Hexadecimal |
| pagePy | Resume Padding Y | Number |
| profileMb | Profile Margin bottom | Number |
| experienceMb | Experience Margin bottom | Number |
| plainFootPx | Footnote Padding X | Number (only valid for the `plain` template) |
| plainContactPx | Contact Padding X | Number (only valid for the `plain` template) |
| detailsFont | Experience Section Font Size | Number |

### 🔮 For Development

If you are familiar with the Web frontend technologies and are interested in source code, you can run this program using the following commands:

```sh
npm install
npm run dev
```

## 🌷 Preview

![Avatar Template](https://s2.loli.net/2024/04/21/6sS5EQIpol7vPzW.png)

---

![Plain Template](https://s2.loli.net/2024/04/21/hSBOZIYumoEDd14.png)
