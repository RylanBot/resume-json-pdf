import React from 'react';

interface LinkParserProps {
    value: string;
    className?: string;
};

const LinkParser: React.FC<LinkParserProps> = ({ value, className }): React.ReactElement => {
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

export default LinkParser;