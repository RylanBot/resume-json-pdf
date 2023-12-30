import React from 'react';

import { ProfileData } from '@/types/profile';

import getIconComponent from '@/helpers/IconParser';
import LinkParser from '@/helpers/LinkParser';

interface ProfileListProps {
    data?: ProfileData;
    theme?: string
}

const ProfileListAvatar: React.FC<ProfileListProps> = ({ data }) => {
    return (
        <div className="flex justify-between items-center custom-profile-mb">
            <div className="flex items-center ">
                {data?.avatar && (
                    <div className="w-[85px] h-[105px] mr-6">
                        <img width={85} height={105} src={data.avatar} alt="avatar" className='w-full h-full' />
                    </div>
                )}
                <div className='ml-2'>
                    <p className="text-xl font-bold mt-1 mb-3 theme-text-color">{data?.name}</p>
                    {data?.footnote && data.footnote?.map((item, index) => (
                        <p className="text-sm font-semibold mt-2" key={index}>
                            {item.label && <span className='theme-text-color'>{item.label}:&nbsp;</span>}
                            {item.label && <span className='font-normal'>{item.content}</span>}
                        </p>
                    ))}
                </div>
            </div>

            <div className="flex flex-col ml-20">
                {data?.info?.map((item, index) => (
                    <p className="flex text-xs mt-2" key={index}>
                        {item.icon && getIconComponent(item.icon.trim()) && (
                            getIconComponent(item.icon.trim()!, "w-5 h-5 mr-1 theme-text-color")
                        )}
                        {item.key && <span className="font-bold theme-text-color">{item.key}:&nbsp;</span>}
                        {item.value && (LinkParser({ value: item.value }))}
                    </p>
                ))}
            </div>
        </div>
    );
};

const ProfileListPlain: React.FC<ProfileListProps> = ({ data }) => {
    return (
        <div className="custom-profile-mb">
            <div className="flex-grow flex-shrink">
                <p className="text-2xl font-bold text-gray-800 text-center mt-3 theme-text-color">{data?.name}</p>
                
                {/* 一行两组数据 */}
                <div className="mt-2 grid grid-cols-2 gap-2">
                    {data?.footnote?.map((item, index) => (
                        <p className="text-sm text-gray-600 text-center" key={index}>
                            {item.label && <span className="font-semibold theme-text-color">{item.label}: </span>}
                            {item.content}
                        </p>
                    ))}
                </div>

                {/* 一行三组数据 */}
                <div className="mt-2 mb-4 flex flex-wrap justify-center items-center gap-1 text-sm">
                    {data?.info?.map((item, index) => (
                        <div className="flex justify-center items-center px-2" key={index} style={{ flexBasis: 'calc(33.333% - 0.5rem)', maxWidth: 'calc(33.333% - 0.5rem)' }}>
                            <div className="flex justify-center items-center">
                                <span className="mr-1 mt-[0.2rem] theme-text-color">{item.icon && getIconComponent(item.icon.trim())}</span>
                                <div className="flex">
                                    {item.key && (
                                        <span className="font-bold truncate theme-text-color">{item.key}:&nbsp;</span>
                                    )}
                                    <span>{item.value && LinkParser({ value: item.value })}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
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