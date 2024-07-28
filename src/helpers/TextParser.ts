import React, { ReactElement } from "react";

import useModeStore from "@/stores/modeStore";

type Rule = [RegExp, string];

const rules: Rule[] = [
  [/\*\*([^\n]+?)\*\*/g, "<b class='theme-text-color opacity-90'>\$1</b>"], // 加粗
  [/\*([^\n]+?)\*/g, "<i>\$1</i>"], // 斜体
  [/(https?:\/\/)([\w\d./:-]+)/g, "<a href='\$1\$2' target='_blank'>\$2</a>"], // 链接
  [/\`([^\n]+?)\`/g, "<span class='bg-gray-100 rounded py-0.5 px-2 text-xs font-mono'>$1</span>"] // 行内代码
];

const TextParser = (text: string, className?: string): ReactElement => {
  const { editModeStore } = useModeStore();

  let html = text;
  rules.forEach(([rule, template]) => {
    html = html.replace(rule, template);
  });

  if (editModeStore) {
    html = html.replace(/<a href='(.*?)' target='_blank'>(.*?)<\/a>/g, "<span>$2</span>");
  }

  return React.createElement('span', {
    className,
    dangerouslySetInnerHTML: { __html: html }
  });
};

export default TextParser;