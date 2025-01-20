import React, { useEffect, useRef, useState } from 'react';

import EditableText from '@/components/toolkit/EditableText';

import useDataStore from '@/stores/dataStore';
import { ExperienceData, ExperienceItem } from '@/types/experience';

interface ExperienceCardProp extends ExperienceItem {
    sectionIndex: number;
    itemIndex: number;
}

const ExperienceCard: React.FC<ExperienceCardProp> = ({
    sectionIndex, itemIndex, title, subtitle, timeline, tech, details
}) => {
    const { tempStores } = useDataStore();

    const titleRef = useRef<HTMLSpanElement>(null);
    const subtitleRef = useRef<HTMLSpanElement>(null);
    const timelineRef = useRef<HTMLSpanElement>(null);

    const [lineBreak, setLineBreak] = useState(false);

    const pixelsToMm = (pixel: number) => pixel / 3.78;

    // 避免 title + subtitle 过长，实现自动换行
    useEffect(() => {
        const titleElement = titleRef.current;
        const subtitleElement = subtitleRef.current;
        const timelineElement = timelineRef.current;

        if (!titleElement || !subtitleElement || !timelineElement) return;

        const observer = new MutationObserver(() => {
            const titleWidth = titleElement.offsetWidth || 0;
            const subtitleWidth = subtitleElement.offsetWidth || 0;
            const timelineWidth = timelineElement.offsetWidth || 0;

            const pagePxMn = pixelsToMm(40); // px-10
            const titleWidthInMn = pixelsToMm(titleWidth);
            const subtitleWidthInMn = pixelsToMm(subtitleWidth);
            const timelineWidthInMn = pixelsToMm(timelineWidth);

            const shouldBreak = titleWidthInMn + subtitleWidthInMn + timelineWidthInMn + pagePxMn * 2 > 255;
            setLineBreak(shouldBreak);
        });

        observer.observe(titleElement, { childList: true, subtree: true });
        observer.observe(subtitleElement, { childList: true, subtree: true });
        observer.observe(timelineElement, { childList: true, subtree: true });

        return () => {
            observer.disconnect();
        };
    }, [tempStores.styleStore.fontStyle]);

    return (
        <div>
            <div>
                {title &&
                    <span ref={titleRef}>
                        <EditableText text={title} path={`experience.${sectionIndex}.items[${itemIndex}].title`}
                            className='font-bold theme-text-color align-middle text-title'
                        />
                    </span>
                }
                {lineBreak && <br />}
                <span>
                    {subtitle && (
                        <>
                            {!lineBreak && <span className='font-normal text-gray-400 theme-divider-color mx-1 align-middle'>丨</span>}
                            <span ref={subtitleRef} className='align-middle'>
                                <EditableText text={subtitle} path={`experience.${sectionIndex}.items[${itemIndex}].subtitle`}
                                    className='theme-text-color font-semibold text-details '
                                />
                            </span>
                        </>
                    )}
                    {timeline && (
                        <span ref={timelineRef} className={`text-sm mt-1 theme-text-color float-right text-details ${lineBreak ? '-mt-5' : ''}`}>
                            <EditableText text={timeline} path={`experience.${sectionIndex}.items[${itemIndex}].timeline`} />
                        </span>
                    )}
                </span>
            </div>
            <p className='mb-1 theme-text-color'>
                {tech && <EditableText text={tech} path={`experience.${sectionIndex}.items[${itemIndex}].tech`} />}
            </p>
            <ul className='list-disc list-inside mb-2'>
                {details?.filter(detail => detail.trim()).map((detail, detailIndex) => (
                    <li key={detailIndex} className='theme-marker-color font-normal text-details'>
                        <EditableText text={detail} path={`experience.${sectionIndex}.items[${itemIndex}].details[${detailIndex}]`} />
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
                    <div className='flex items-center'>
                        {part.icon &&
                            <EditableText type={'icon'} text={part.icon} path={`experience.${sectionIndex}.icon`}
                                className='w-5 h-5 mr-1 theme-text-color'
                            />
                        }
                        {part.section &&
                            <EditableText text={part.section} path={`experience.${sectionIndex}.section`}
                                className='font-bold theme-text-color text-section'
                            />
                        }
                    </div>
                    {/* 分割线 */}
                    {part.section && <div className='border-solid border-t-2 theme-divider-color mb-1'></div>}
                    {part.items?.map((item, itemIndex) => (
                        <div key={itemIndex} className='custom-experience'>
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
