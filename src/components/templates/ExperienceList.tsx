import React from 'react';

import { ExperienceData, ExperienceItem } from '@/types/experience';

import IconParser from '@/helpers/IconParser';
import LinkParser from '@/helpers/LinkParser';
import strongTextParser from '@/helpers/StrongTextParser';

const ExperienceCard: React.FC<ExperienceItem> = ({
    title, subtitle, timeline, tech, details
}) => {

    return (
        <div className={"font-semibold"}>
            <div className='mb-1'>
                {title && <span className='theme-text-color'>{title}</span>}
                {subtitle && (
                    <>
                        <span className='font-normal px-2 text-gray-400 theme-divider-color'>丨</span>
                        <span>
                            {LinkParser({ value: subtitle, className: 'text-sm theme-text-color' })}
                        </span>
                    </>
                )}
                {timeline && <span className='float-right text-sm mt-1 theme-text-color'>{timeline}</span>}
            </div>
            {tech && (
                <p className='mb-2'>
                    {tech.split('+').map((item, index) => (
                        <span key={index} className="bg-gray-100 rounded py-1 px-2 text-sm mr-2 italic font-mono theme-text-color">
                            {item.trim()}
                        </span>
                    ))}
                </p>
            )}
            <ul className="list-disc list-inside mb-2">
                {details && details.map((detail, index) => (
                    detail ? (
                        <li key={index} className='theme-marker-color'>
                            <span className='font-normal'>{strongTextParser(detail)}</span>
                        </li>
                    ) : null
                ))}
            </ul>
        </div>
    );
};

/* ------------------------------------------------------------ */

interface ExperienceListProps {
    data?: ExperienceData[];
}

const ExperienceList: React.FC<ExperienceListProps> = ({ data }) => {
    return (
        <div className='mt-2'>
            {data?.map((part, index) => (
                <div key={index} className="mb-2">
                    <div
                        className="flex items-center mb-1">
                        {part.icon && IconParser(part.icon.trim()) && (
                            (IconParser(part.icon.trim(), 'w-5 h-5 mr-2 theme-text-color'))
                        )}
                        {part.section && <p className="text-lg font-bold theme-text-color">{part.section}</p>}
                    </div>
                    {/* Divider */}
                    {part.section && <div className="border-solid border-t-2 theme-divider-color"></div>}
                    {part.items && part.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="mt-1 custom-experience-mb">
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
