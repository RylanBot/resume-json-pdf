import React, { ReactNode } from "react";

export const LinkParser = (value: string, className?: string): React.ReactElement => {
    const isHttpUrl = value.startsWith('https://') || value.startsWith('http://');

    if (isHttpUrl) {
        const displayText = value.replace(/^https?:\/\//, '');
        return React.createElement('a',
            { href: value, className: className, target: "_blank", rel: "noopener noreferrer" },
            displayText
        );
    }

    return React.createElement('span', { className: className }, value);
};

export const StrongTextParser = (text: string): ReactNode[] => {
    const regex = /\*\*(.*?)\*\*/g;
    let parts: ReactNode[] = [];
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