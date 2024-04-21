import React, { ReactNode } from "react";

import useModeStore from "@/stores/modeStore";

export const LinkParser = (text: string, className?: string): React.ReactElement => {
    const { editModeStore } = useModeStore.getState();

    const isHttpUrl = text.startsWith('https://') || text.startsWith('http://');
    const displayText = text.replace(/^https?:\/\//, '');

    if (editModeStore || !isHttpUrl) {
        return React.createElement('span', { className: className }, displayText);
    }

    return React.createElement('a',
        { href: text, className: className, target: "_blank", rel: "noopener noreferrer" },
        displayText
    );
};

export const StrongTextParser = (text: string): ReactNode[] => {
    const regex = /\*\*(.*?)\*\*/g;
    const parts: ReactNode[] = [];
    let lastIndex = 0;

    text.replace(regex, (match: string, p1: string, index: number) => {
        if (index > lastIndex) {
            parts.push(text.substring(lastIndex, index));
        }

        parts.push(React.createElement('strong', {
            key: index,
            className: "theme-text-color",
            style: {
                color: "rgb(from var(--theme-color) r g b / 85%)",
            }
        }, p1));

        lastIndex = index + match.length;
        return match;
    });

    if (lastIndex < text.length) {
        parts.push(text.substring(lastIndex));
    }

    return parts;
};

export const TechParser = (text: string): React.ReactElement => {
    const techItems = text
        .split(/(?<!\+)\+ *(?=\+?)/)  // 不匹配连续加号
        .filter(item => item.trim() !== '')
        .map((item, index) =>
            React.createElement('span', {
                key: index,
                className: "bg-gray-100 rounded py-0.5 px-2 text-xs mr-2 italic font-mono font-bold theme-text-color",
            }, item.trim())
        );

    return React.createElement(React.Fragment, {}, ...techItems);
};

/**
 * 处理不同语言造成的换行情况不同 
 */
export const formatTitle = (title: string) => {
    const words = title.split(' ');
    if (words.length > 1) {
        return words[0] + '\n' + words.slice(1).join(' ');
    }
    return title;
}