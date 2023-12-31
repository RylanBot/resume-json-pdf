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
                    <p className="text-2xl font-bold mt-1 mb-3 theme-text-color">{data?.name}</p>
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
                            <span className="mr-1 theme-text-color">{getIconComponent(item.icon.trim(), "w-4 h-4")}</span>
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
                <p className="text-2xl font-bold text-gray-800 text-center mt-2 theme-text-color">{data?.name}</p>

                <div className="mt-2 flex flex-wrap justify-center items-center text-sm gap-1">
                    {data?.footnote?.map((item, index) => (
                        <div className="flex justify-center items-center plain-footnote-item" key={index} style={{ flexBasis: 'auto' }}>
                            <div className="flex justify-center items-center">
                                {item.label && (
                                    <span className="font-bold theme-text-color">{item.label}:&nbsp;</span>
                                )}
                                {item.content && LinkParser({ value: item.content })}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="my-2 flex flex-wrap justify-center items-center text-sm gap-1">
                    {data?.info?.map((item, index) => (
                        <div className="flex justify-center items-center plain-info-item" key={index} style={{ flexBasis: 'auto' }}>
                            <div className="flex items-center">
                                {item.icon && (<span className="mr-1 mb-[1px] theme-text-color">{getIconComponent(item.icon.trim())}</span>)}
                                {item.key && (
                                    <span className="font-bold theme-text-color">{item.key}:&nbsp;</span>
                                )}
                                {item.value && LinkParser({ value: item.value })}
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