import React, { useEffect, useRef, useState } from 'react';

import { ExperienceData, ExperienceItem } from '@/types/experience';

import EditableText from '@/components/toolkit/EditableText';

interface ExperienceCardProp extends ExperienceItem {
    sectionIndex: number;
    itemIndex: number;
}

const ExperienceCard: React.FC<ExperienceCardProp> = ({
    sectionIndex, itemIndex, title, subtitle, timeline, tech, details
}) => {
    const titleRef = useRef<HTMLSpanElement>(null);
    const subtitleRef = useRef<HTMLSpanElement>(null);
    const [shouldBreak, setShouldBreak] = useState(false);

    // 避免 title + subtitle过长，实现自动换行
    useEffect(() => {
        setShouldBreak(false);
        // 确保在 DOM 更新数据后测量
        setTimeout(() => {
            const titleWidth = titleRef.current ? titleRef.current.offsetWidth : 0;
            const subtitleWidth = subtitleRef.current ? subtitleRef.current.offsetWidth : 0;

            if (titleWidth + subtitleWidth > 525) {
                setShouldBreak(true);
            }
        }, 0);

    }, [title, subtitle]);

    return (
        <div>
            <div>
                {title &&
                    <span ref={titleRef}>
                        <EditableText text={title} path={`experience.${sectionIndex}.items[${itemIndex}].title`}
                            className="font-bold theme-text-color align-middle text-title"
                        />
                    </span>
                }
                {shouldBreak && <br />}
                <span>
                    {subtitle && (
                        <>
                            {!shouldBreak && <span className="font-normal text-gray-400 theme-divider-color mx-2 align-middle">丨</span>}
                            <span ref={subtitleRef} className="align-middle">
                                <EditableText type={"link"} text={subtitle} path={`experience.${sectionIndex}.items[${itemIndex}].subtitle`}
                                    className="theme-text-color font-semibold text-details "
                                />
                            </span>
                        </>
                    )}
                    {timeline && (
                        <span className={`text-sm mt-1 theme-text-color float-right text-details ${shouldBreak ? "-mt-5" : ""}`}>
                            <EditableText text={timeline} path={`experience.${sectionIndex}.items[${itemIndex}].timeline`} />
                        </span>
                    )}
                </span>
            </div>
            <p className="mb-1">
                {tech && <EditableText type={"tech"} text={tech} path={`experience.${sectionIndex}.items[${itemIndex}].tech`} />}
            </p>
            <ul className="list-disc list-inside mb-2">
                {details?.filter(detail => detail.trim()).map((detail, detailIndex) => (
                    <li key={detailIndex} className="theme-marker-color font-normal text-details">
                        <EditableText type={"strong"} text={detail} path={`experience.${sectionIndex}.items[${itemIndex}].details[${detailIndex}]`} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

interface ExperienceListProps {
    data: ExperienceData[];
}

const ExperienceList: React.FC<ExperienceListProps> = ({ data }) => {
    return (
        <div>
            {data?.map((part, sectionIndex) => (
                <div key={sectionIndex}>
                    <div className="flex items-center">
                        {part.icon &&
                            <EditableText type={"icon"} text={part.icon} path={`experience.${sectionIndex}.icon`}
                                className="w-5 h-5 mr-1 theme-text-color"
                            />
                        }
                        {part.section &&
                            <EditableText text={part.section} path={`experience.${sectionIndex}.section`}
                                className="font-bold theme-text-color text-section"
                            />
                        }
                    </div>
                    {/* 分割线 */}
                    {part.section && <div className="border-solid border-t-2 theme-divider-color mb-1"></div>}
                    {part.items?.map((item, itemIndex) => (
                        <div key={itemIndex} className="custom-experience">
                            <ExperienceCard
                                sectionIndex={sectionIndex}
                                itemIndex={itemIndex}
                                title={item.title}
                                subtitle={item.subtitle}
                                timeline={item.timeline}
                                tech={item.tech}
                                details={item.details}
                            />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default ExperienceList;
