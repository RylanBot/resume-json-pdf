import React, { useEffect, useRef, useState } from 'react';

import { ExperienceData, ExperienceItem } from '@/types/experience';

import IconParser from '@/helpers/IconParser';
import { LinkParser, StrongTextParser } from '@/helpers/TextParser';

const ExperienceCard: React.FC<ExperienceItem> = ({
    title, subtitle, timeline, tech, details
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
        <div className="font-semibold text-base">
            <div>
                <span ref={titleRef} className='theme-text-color align-middle'>{title}</span>
                {shouldBreak && <br />}
                <span>
                    {subtitle && (
                        <>
                            {!shouldBreak && <span className='font-normal text-gray-400 theme-divider-color mx-2 align-middle'>丨</span>}
                            <span ref={subtitleRef} className='theme-text-color text-sm align-middle'>
                                {LinkParser(subtitle, 'theme-text-color')}
                            </span>
                        </>
                    )}
                    <span className={`text-sm mt-1 theme-text-color float-right ${shouldBreak ? "-mt-5" : ""}`}>
                        {timeline}
                    </span>
                </span>
            </div>
            <p className='mb-1'>
                {tech?.split('+')
                    .filter(item => item.trim() !== '')
                    .map((item, index) => (
                        <span key={index} className="bg-gray-100 rounded py-0.5 px-2 text-xs mr-2 italic font-mono font-bold theme-text-color">
                            {item.trim()}
                        </span>
                    ))}
            </p>
            <ul className="list-disc list-inside mb-2 details-font">
                {details?.map((detail, index) => (
                    <li key={index} className='theme-marker-color'>
                        <span className='font-normal'>{StrongTextParser(detail)}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

/* ------------------------------------------------------------ */

interface ExperienceListProps {
    data: ExperienceData[];
}

const ExperienceList: React.FC<ExperienceListProps> = ({ data }) => {
    return (
        <div className='mt-2'>
            {data?.map((part, index) => (
                <div key={index} className="mb-2">
                    <div className="flex items-center mb-0.5">
                        {part.icon && IconParser(part.icon.trim()) && (
                            (IconParser(part.icon.trim(), 'w-5 h-5 mr-2 theme-text-color'))
                        )}
                        <p className="font-bold theme-text-color text-lg">{part.section}</p>
                    </div>
                    {/* Divider */}
                    {part.section && <div className="border-solid border-t-2 theme-divider-color mb-1"></div>}
                    {part.items?.map((item, itemIndex) => (
                        <div key={itemIndex} className="custom-experience">
                            <ExperienceCard
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
