> [!Important]  
> **This changelog records important milestones of the project, which may include breaking changes.**  
> **Please check the README for parameter formats and adjust your JSON configuration files accordingly.**

## 🌈 2025.07.11

**Support for rendering multi-page resumes. The `page` field has been added to the _section_ of _experience_ to specify which page it belongs to.**

- Default is 1, can be omitted.
- If a _section_ sets the `page` field to 2, all content from that section onwards will be rendered on the second page, until encountering the next section with `page` field set to 3.
- No need to set the `page` field to 2 for all _sections_ on the second page, only the first item needs to be set.

## 🌈 2025.01.20

**Support for custom font configuration. The `fontStyle` field in _style_ can be set to any local font name.**

- Deprecate the previous `default` and `fancy` configurations. ⚠️
- Click to view [built-in font list](https://github.com/RylanBot/resume-json-pdf/blob/main/src/data/style.ts#L4).
- The actual selectable font list online depends on current browser support. For example, if your computer doesn't have the STZhongsong font, it won't be displayed.

## 🌈 2024.07.12

**Support for rendering italic and bold using Markdown syntax, and all link formats are clickable.**

- For example, \*\*\_https: //example.com\_\*\* will be rendered as **_[example.com](https://example.com)_**, achieving bold italic links.
- Deprecate `label` and `content` fields from _profile_'s _footnote_. ⚠️
- Deprecate `key` field from _profile_'s _contact_. ⚠️

## 🌈 2024.06.26

- Icon library changed from `react-icons` to `font-awesome`. ⚠️
- Add `fontStyle` field to **_style_**, setting it to `fancy` will switch to Noto Serif font.

## 🌈 2024.01.01

**Project is now open source.**
