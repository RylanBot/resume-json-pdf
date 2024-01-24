import React from 'react';

import { ProfileData } from '@/types/profile';

import IconParser from '@/helpers/IconParser';
import { LinkParser } from '@/helpers/TextParser';

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
                    <p className="text-xl font-bold mt-1 mb-3 theme-text-color">{data.name}</p>
                    {data.footnote?.map((item, index) => (
                        <p className="text-sm font-semibold mt-2" key={index}>
                            <span className='theme-text-color'>{item.label}</span>
                            {item.label && item.content && <span>:&nbsp;</span>}
                            <span className='font-normal'>{item.content}</span>
                        </p>
                    ))}
                </div>
            </div>

            <div className="flex flex-col ml-20">
                {data.contact?.map((item, index) => (
                    <p className="flex text-xs mt-2" key={index}>
                        {item.icon && (<span className="mr-1 theme-text-color">{IconParser(item.icon.trim(), "w-4 h-4")}</span>)}
                        {item.key && <span className="font-bold theme-text-color">{item.key}:&nbsp;</span>}
                        {item.value && (LinkParser(item.value))}
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
                <p className="text-xl font-bold text-gray-800 text-center mt-2 theme-text-color">{data?.name}</p>

                <div className="mt-2 flex flex-wrap justify-center items-center text-sm gap-1">
                    {data.footnote?.map((item, index) => (
                        <div className="flex justify-center items-center plain-footnote-item" key={index} style={{ flexBasis: 'auto' }}>
                            <div className="flex justify-center items-center">
                                <span className="font-bold theme-text-color">{item.label}</span>
                                {item.label && item.content && <span className='theme-text-color'>:&nbsp;</span>}
                                {item.content && LinkParser(item.content)}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="my-2 flex flex-wrap justify-center items-center text-sm gap-1">
                    {data.contact?.map((item, index) => (
                        <div className="flex justify-center items-center plain-contact-item" key={index} style={{ flexBasis: 'auto' }}>
                            <div className="flex items-center">
                                {item.icon && (<span className="mr-1 mb-[1px] theme-text-color">{IconParser(item.icon.trim())}</span>)}
                                {item.key && (<span className="font-bold theme-text-color">{item.key}:&nbsp;</span>)}
                                {item.value && LinkParser(item.value)}
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