import React, { ReactNode } from "react";

const StrongTextParser = (text: string): ReactNode[] => {
    const regex = /\*(.*?)\*/g;
    let parts: ReactNode[] = [];
    let lastIndex = 0;

    text.replace(regex, (match: string, p1: string, index: number) => {
        if (index > lastIndex) {
            parts.push(text.substring(lastIndex, index));
        }
        
        // 添加加粗文本
        parts.push(React.createElement('strong', {
            key: index,
            className: "theme-text-color",
            style: {   
                color: "rgb(from var(--theme-color) r g b / 75%)",
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

export default StrongTextParser;