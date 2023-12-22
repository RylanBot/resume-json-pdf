import LinkRenderer from '@/components/LinkRenderer';

import { ExperienceData, ExperienceItem } from '@/stores/experience';

import getIconComponent from '@/utils/getIconComponent';
import strongTextParser from '@/utils/strongTextParser';

const ExperienceCard: React.FC<ExperienceItem> = ({
    title, subtitle, timeline, tech, details
}) => {
    return (
        <div className='font-semibold mt-2 mb-3'>
            <div className='my-1'>
                {title && <span>{title}</span>}
                {subtitle && (
                    <>
                        <span className='font-normal px-2 text-gray-400'>丨</span>
                        <LinkRenderer value={subtitle} className={'text-gray-700 text-sm'} />
                    </>
                )}
                {timeline && <span className='float-right text-sm mt-1'>{timeline}</span>}
            </div>
            {tech && (
                <p>
                    {tech.split('+').map((item, index) => (
                        <span key={index} className="bg-gray-100 rounded py-1 px-2 text-sm text-gray-800 mr-2 italic font-mono">
                            {item.trim()}
                        </span>
                    ))}
                </p>
            )}
            <ul className="list-disc list-inside my-2">
                {details.map((detail, index) => (
                    detail ? (
                        <li key={index}>
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
            {data?.map((section, index) => (
                <div key={index} className="mb-2">
                    <div className="flex items-center mb-2">
                        {section.icon && getIconComponent(section.icon.trim()) && (
                            (getIconComponent(section.icon.trim(), 'w-5 h-5 mr-2'))
                        )}
                        {section.theme && <p className="text-lg font-bold">{section.theme}</p>}
                    </div>
                    {/* Divider */}
                    {section.theme && <div className="border-solid border-t border-2 border-gray-500"></div>}
                    {section.items.map((item, itemIndex) => (
                        <ExperienceCard
                            key={itemIndex}
                            title={item.title}
                            subtitle={item.subtitle}
                            timeline={item.timeline}
                            tech={item.tech}
                            details={item.details}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default ExperienceList;
