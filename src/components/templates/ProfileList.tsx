import { ProfileData } from '@/types/profile';

import getIconComponent from '@/helpers/IconParser';
import LinkParser from '@/helpers/LinkParser';

interface ProfileListProps {
    data?: ProfileData;
    marginBottom?: number;
}

const ProfileList: React.FC<ProfileListProps> = ({ data, marginBottom }) => {
    return (
        <div className="flex justify-between items-center"
            style={{ marginBottom: marginBottom }}
        >
            <div className="flex">
                {data?.avatar && (
                    <div className="w-[85px] h-[100px] mr-6 mb-2">
                        <img width={85} height={100} src={data.avatar} alt="avatar" className='w-full h-full' />
                    </div>
                )}
                <div className='ml-2'>
                    <p className="text-xl font-bold my-3">{data?.name}</p>
                    {data?.footnote && data.footnote?.map((item, index) => (
                        <p className="text-sm font-semibold mt-2" key={index}>
                            {item.label && <span>{item.label}:&nbsp;</span>}
                            {item.label && <span className='font-normal'>{item.content}</span>}
                        </p>
                    ))}
                </div>
            </div>

            <div className="flex flex-col ml-20">
                {data?.info?.map((item, index) => (
                    <p className="flex text-xs mt-2" key={index}>
                        {item.icon && getIconComponent(item.icon.trim()) && (
                            getIconComponent(item.icon.trim()!, "w-5 h-5 mr-1")
                        )}
                        {item.key && <span className="font-bold">{item.key}:&nbsp;</span>}
                        {item.value && (LinkParser({ value: item.value }))}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default ProfileList;