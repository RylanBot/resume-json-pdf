# resume-json-pdf

[中文文档](./README.md) | README in English

**Edit JSON files locally for an engaging writing process and obtain PDF / HTML resumes online 📄**

## 🔥 Features

- **Support for multiple templates**：Provide versions with and without photos in both Chinese and English.
- **Support for icon integration**: Reference the [react-icons](https://react-icons.github.io/react-icons/) library.
- **Support for bold text**：Enclose value within the 'details' field in double asterisks, e.g., " ** Optimize xxx ** " will render as "**Optimize xxx**".
- **Support for linking**：Use "http" or "https" at the beginning of 'value' and 'subtitle' fields, e.g., "https: \//github.com/RylanBot" will render as "[github.com/RylanBot](https://github.com/RylanBot)"
- **Support for tech stack separation**：Use plus signs within the 'tech' field，e.g., "React+TypeScript+Tailwind CSS" will render as "_`React` `TypeScript` `Tailwind CSS`_".
- **Support for custom colors**：Choose and preview your preferred styles online.
- **Support for custom layout**：Create section such as "1 Internships + 3 Projects" or "2 Internships + 2 Projects", or introduce additional elements like "Published Papers" as long as they maintain a neat page. When there is less content, adjust margin or padding to ensure proper design.

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
| footnote[] | | { "label": "", "content": "" } |
| contact[] | | { "icon": "", "key": "", "value": "" } |

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
| color | | Hexadecimal |
| pagePy | Resume Padding Y | Number |
| profileMb | Profile Margin bottom | Number |
| experienceMb | Experience Margin bottom | Number |
| plainFootPx | Footnote Padding X | Number (only valid for the plain template) |
| plainContactPx | Contact Padding X | Number (only valid for the plain template) |
| detailsFont | | number |

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

![resume-json-pdf-avatar-en](https://s2.loli.net/2024/01/08/dxwsEZrMiPtgn9U.png)

---

![resume-json-pdf-plain-en](https://s2.loli.net/2024/01/08/Th36RyJZAMDYiwr.png)
