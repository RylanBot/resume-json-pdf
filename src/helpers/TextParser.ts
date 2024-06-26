import React, { ReactNode } from "react";

import useModeStore from "@/stores/modeStore";

/**
 * 解析加粗文本与链接
 */
export const DefaultParser = (text: string, className?: string): ReactNode[] => {
  const { editModeStore } = useModeStore();

  const parts: ReactNode[] = [];
  let index = 0;

  const createBold = (text: string) => {
    return React.createElement(
      "strong",
      {
        key: index++,
        className: "theme-text-color",
        style: { color: "rgb(from var(--theme-color) r g b / 85%)" },
      },
      text
    );
  };

  const pushText = (text: string) => {
    parts.push(
      React.createElement("span", { key: index++, className: className }, text)
    );
  };

  const pushBold = (text: string) => {
    parts.push(createBold(text));
  };

  const pushLink = (text: string, bold: boolean) => {
    const httpRegex = /^https?:\/\//;
    const isHttpUrl = httpRegex.test(text);
    const displayText = text.replace(httpRegex, "");

    const textElement = bold
      ? createBold(displayText)
      : React.createElement(
        "span",
        { key: index++, className: className },
        displayText
      );

    if (editModeStore || !isHttpUrl) {
      parts.push(textElement);
    } else {
      parts.push(
        React.createElement(
          "a",
          {
            key: index++,
            href: text,
            className: className,
            target: "_blank",
            rel: "noopener noreferrer",
          },
          textElement
        )
      );
    }
  };

  const regex = /(\*\*\s*(https?:\/\/[^\s]*?)\s*\*\*)|(\*\*\s*(.*?)\s*\*\*)|(\s*https?:\/\/[^\s]+\s*)/g;

  let match;
  let lastIndex = 0;
  while ((match = regex.exec(text)) !== null) {
    pushText(text.substring(lastIndex, match.index));

    if (match[1]) {
      pushLink(match[2], true);
    } else if (match[3]) {
      pushBold(match[4]);
    } else if (match[5]) {
      pushLink(match[5], false);
    }

    lastIndex = regex.lastIndex;
  }

  pushText(text.substring(lastIndex));

  return parts;
};

/**
 * 解析技术栈
 */
export const TechParser = (text: string): React.ReactElement => {
  const techItems = text
    .split(/(?<!\+)\+ *(?=\+?)/) // 不匹配连续加号
    .filter((item) => item.trim() !== "")
    .map((item, index) =>
      React.createElement(
        "span",
        {
          key: index,
          className:
            "bg-gray-100 rounded py-0.5 px-2 text-xs mr-2 italic font-mono font-bold theme-text-color",
        },
        item.trim()
      )
    );

  return React.createElement(React.Fragment, {}, ...techItems);
};
