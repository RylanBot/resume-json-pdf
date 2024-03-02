import React from 'react';

import { ProfileData } from '@/types/profile';

import EditableText from '@/components/toolkit/EditableText';

interface ProfileListProps {
    data: ProfileData;
    theme?: string
}

const ProfileListAvatar: React.FC<ProfileListProps> = ({ data }) => {
    return (
        <div className="flex justify-between items-center custom-profile">

            <div className="flex items-center ">
                {data.avatar && (
                    <div className="w-[80px] h-[100px] mr-6">
                        <img src={data.avatar} alt="avatar" className='w-full h-full' />
                    </div>
                )}
                <div className='ml-2'>
                    <p className="text-xl font-bold mt-1 mb-3 theme-text-color">
                        {data.name && <EditableText text={data.name} path={`profile.name`} />}
                    </p>
                    {data.footnote?.map((footnote, footIndex) => (
                        <p className="text-sm mt-2" key={footIndex}>
                            <EditableText text={footnote.label} path={`profile.footnote[${footIndex}].label`}
                                className='font-semibold theme-text-color'
                            />
                            {footnote.label && footnote.content && <span>:&nbsp;</span>}
                            <EditableText text={footnote.content} path={`profile.footnote[${footIndex}].content`}
                                className='font-normal'
                            />
                        </p>
                    ))}
                </div>
            </div>

            <div className="flex flex-col ml-20">
                {data.contact?.map((contact, conIndex) => (
                    <p className="flex text-xs mt-2" key={conIndex}>
                        {contact.icon &&
                            <EditableText type={"icon"} text={contact.icon.trim()} path={`profile.contact[${conIndex}].icon`}
                                className="w-4 h-4 mr-1 theme-text-color"
                            />}
                        {contact.key &&
                            <span className="theme-text-color pt-0.5">
                                <EditableText text={contact.key} path={`profile.contact[${conIndex}].key`} className="font-bold" />
                                :&nbsp;
                            </span>
                        }
                        {contact.value && <EditableText text={contact.value} path={`profile.contact[${conIndex}].value`} />}
                    </p>
                ))}
            </div>

        </div>
    );
};

const ProfileListPlain: React.FC<ProfileListProps> = ({ data }) => {
    return (
        <div className="custom-profile">

            <div className="flex-grow flex-shrink">
                <p className="text-xl font-bold text-gray-800 text-center mt-2 theme-text-color">
                    <EditableText text={data.name} path={`profile.name`} />
                </p>

                {data.footnote && data?.footnote?.length > 0 && (
                    <div className="flex flex-wrap justify-center items-center text-sm gap-1 mt-2">
                        {data.footnote?.map((footnote, footIndex) => (
                            <div className="flex justify-center items-center plain-footnote-item" key={footIndex} style={{ flexBasis: 'auto' }}>
                                <div className="flex justify-center items-center">
                                    <EditableText text={footnote.label} path={`profile.footnote[${footIndex}].label`}
                                        className='font-semibold theme-text-color' />
                                    {footnote.label && footnote.content && <span className='theme-text-color'>:&nbsp;</span>}
                                    {footnote.content && <EditableText text={footnote.content} path={`profile.footnote[${footIndex}].content`} />}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="flex flex-wrap justify-center items-center text-sm gap-1 mt-2">
                    {data.contact?.map((item, index) => (
                        <div className="flex justify-center items-center plain-contact-item" key={index} style={{ flexBasis: 'auto' }}>
                            <div className="flex items-center">
                                {item.icon &&
                                    <EditableText type={"icon"} text={item.icon.trim()} path={`profile.contact[${index}].icon`}
                                        className='mr-1 mb-[1px] theme-text-color'
                                    />
                                }
                                {item.key && (
                                    <span className="font-bold theme-text-color">
                                        <EditableText text={item.key} path={`profile.contact[${index}].key`} />
                                        :&nbsp;
                                    </span>
                                )}
                                {item.value && <EditableText type={"link"} text={item.value} path={`profile.contact[${index}].value`} />}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div >
    );
};

const ProfileList: React.FC<ProfileListProps> = ({ data, theme }) => {
    switch (theme) {
        case 'avatar':
            return <ProfileListAvatar data={data} />;
        case 'plain':
            return <ProfileListPlain data={data} />;
        default:
            return <ProfileListAvatar data={data} />;
    }
};

export default ProfileList;