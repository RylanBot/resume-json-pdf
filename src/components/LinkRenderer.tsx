import React from 'react';

const LinkRenderer: React.FC<{ value: string; className?: string }> = ({ value, className }) => {
    const isHttpUrl = value.startsWith('https://') || value.startsWith('http://');
    if (isHttpUrl) {
        const displayText = value.replace(/^https?:\/\//, '');
        return <a href={value} className={className} target="_blank" rel="noopener noreferrer">{displayText}</a>;
    }
    return <span className={className}>{value}</span>;
};

export default LinkRenderer; 