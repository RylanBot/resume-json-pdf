import React, { useEffect, useRef, useState } from 'react';

import IconParser from '@/helpers/IconParser';
import { LinkParser, StrongTextParser, TechParser } from '@/helpers/TextParser';
import useEditWithUndo from '@/hooks/useEditWithUndo';
import useModeStore from '@/stores/modeStore';

interface EditableTextProps {
    /* 不传类型则默认渲染纯文本 */
    type?: "strong" | "link" | "tech" | "icon";
    text?: string;
    /* 索引路径，比如 profile.name，experience.[0].item[1].details[2] */
    path: string;
    className?: string;
}

const EditableText: React.FC<EditableTextProps> = (
    { text, path, type, className }
) => {
    const { editModeStore } = useModeStore();

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [rawText, setRawText] = useState<string | undefined>(text);
    const editableRef = useRef<HTMLSpanElement>(null);

    // 提取开头，判断数据来源
    const { updateTempValue } = useEditWithUndo(`${path.split('.')[0]}Store` as 'profileStore' | 'experienceStore');

    const RenderText = () => {
        if (isEditing) {
            return rawText;
        } else {
            switch (type) {
                case 'strong':
                    return <>{StrongTextParser(rawText ?? '')}</>;
                case 'link':
                    return <>{LinkParser(rawText ?? '', className)}</>;
                case 'tech':
                    return <>{TechParser(rawText ?? '')}</>;
                case 'icon':
                    return <>{(IconParser(rawText?.trim() ?? '', className))}</>
                default:
                    return <span className={className}>{rawText}</span>;
            }
        }
    };

    const handleClick = () => {
        if (editModeStore) {
            setIsEditing(true);
            /*  确保点击时将焦点设置到元素上，触发边框样式*/
            setTimeout(() => {
                editableRef.current?.focus();
            }, 0);
        }
    };

    const handleBlur = () => {
        if (editModeStore) {
            setIsEditing(false);
            const newText = editableRef.current?.innerText;
            if (newText !== undefined && newText !== rawText) {
                const subPath = path.split('.').slice(1).join('.');
                // console.log(origin, subPath, newText)
                updateTempValue(subPath, newText);
                setRawText(newText);
            }
        }
    };

    useEffect(() => {
        setIsEditing(false);
        setRawText(text);
    }, [text, editModeStore]);

    return (
        <span
            key={+new Date()} // 添加唯一标识，避免文字清空时 Remove DOM 报错
            ref={editableRef}
            contentEditable={isEditing}
            onClick={handleClick}
            onBlur={handleBlur}
            suppressContentEditableWarning={true} // 强行绕过 React 的警告
            className="font-normal editable"
        >
            <RenderText />
        </span>
    );
};

export default EditableText;