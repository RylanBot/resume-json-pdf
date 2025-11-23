> [!Important]  
> **这份日志记录了项目的一些重要性节点，可能包含一些不兼容的更新**  
> **建议及时查看 README 的参数格式，并调整 JSON 配置文件**

## 🌈 2025.11.24
**支持在线编辑 JSON 源码**

## 🌈 2025.07.11

**支持渲染多页简历，_experience_ 的 _section_ 新增 `page` 字段，用于指定该部分属于简历的哪一页**

- 默认为 1，可不传入
- 如果某个 _section_ 的 `page` 字段设为 2，则从它开始的所有内容都会渲染到第二页，直到遇见字段为 3 的项
- 不需要给第二页的所有 _section_ 的 `page` 字段都设为 2，只要首项有设置即可

## 🌈 2025.01.20

**支持自由配置字体，_style_ 的 `fontStyle` 字段可以设为任何本地的字体名称**

- 废弃原先的 `default` 与 `fancy` 配置 ⚠️
- 点击查看 [内置字体列表](https://github.com/RylanBot/resume-json-pdf/blob/main/src/data/style.ts#L4)
- 在线实际可挑选的字体列表取决于当前浏览器的支持情况，例如电脑没有 STZhongsong 字体，则不会显示

## 🌈 2024.07.12

**支持使用 Markdown 语法渲染斜体与加粗，且所有链接格式均可点击跳转**

- 例如 \*\*\_https: //example.com\_\*\* 会被渲染为 **_[example.com](https://example.com)_**，实现加粗斜体链接
- **_profile_** 的 _footnote_ 移除 `label` 和 `content` 字段 ⚠️
- **_profile_** 的 _contact_ 移除 `key` 字段 ⚠️

## 🌈 2024.06.26

- 图标库从 `react-icons` 库更换为 `font-awesome` ⚠️
- **_style_** 新增 `fontStyle` 字段，设为 `fancy` 将切换为 Noto Serif 字体

## 🌈 2024.01.01

**项目正式开源**
