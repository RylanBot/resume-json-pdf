import React from 'react';

import { ProfileData } from '@/types/profile';

import getIconComponent from '@/helpers/IconParser';
import LinkParser from '@/helpers/LinkParser';

interface ProfileListProps {
    data?: ProfileData;
}

const ProfileList: React.FC<ProfileListProps> = ({ data }) => {
    return (
        <div className="flex justify-between items-center custom-profile-mb">
            <div className="flex">
                {data?.avatar && (
                    <div className="w-[85px] h-[100px] mr-6 mb-2">
                        <img width={85} height={100} src={data.avatar} alt="avatar" className='w-full h-full' />
                    </div>
                )}
                <div className='ml-2'>
                    <p className="text-xl font-bold my-3 theme-text-color">{data?.name}</p>
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

export default ProfileList;