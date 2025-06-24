import { useEffect, useRef, useState } from 'react';

import TextParser from '@/helpers/TextParser';
import useEditWithUndo from '@/hooks/useEditWithUndo';
import useModeStore from '@/stores/modeStore';

interface EditableTextProps {
    type?: "icon";
    text: string;
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
                case 'icon':
                    return <i id="contact-icon" className={`${rawText ?? ""} ${className}`}></i>;
                default:
                    return <>{TextParser(rawText ?? "", className)}</>;
            }
        }
    };

    const handleClick = () => {
        if (editModeStore) {
            setIsEditing(true);
            // 确保点击时将焦点设置到元素上，触发边框样式
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

    const handleKeyDown = (event: React.KeyboardEvent<HTMLSpanElement>) => {
        // 禁止换行
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    };

    const handlePaste = (event: React.ClipboardEvent<HTMLSpanElement>) => {
        const items = event.clipboardData.items;
        Array.from(items).forEach(item => {
            // 禁止粘贴图片
            if (item.type.indexOf('image') !== -1) {
                event.preventDefault();
            }
        });
    };

    useEffect(() => {
        setIsEditing(false);
        setRawText(text);
    }, [text, editModeStore]);

    return (
        <span
            key={+new Date()} // 添加唯一标识，避免文字清空时 Remove DOM 报错
            ref={editableRef}
            className="font-normal editable"
            contentEditable={isEditing}
            onClick={handleClick}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            suppressContentEditableWarning={true} // 强行绕过 React 的警告
        >
            <RenderText />
        </span>
    );
};

export default EditableText;