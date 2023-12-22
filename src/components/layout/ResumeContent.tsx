import React from 'react';

import { ExperienceData } from '@/stores/experience';
import { ProfileData } from '@/stores/profile';

import A4Background from '@/components/layout/A4Background';
import ExperienceList from '@/components/templates/ExperienceList';
import ProfileList from '@/components/templates/ProfileList';

interface ResumeContentProps {
    profile: ProfileData,
    experience: ExperienceData[],
    className?: string,
}

const ResumeContent = React.forwardRef<HTMLDivElement, ResumeContentProps>(({ profile, experience, className }, ref) => (
    <div ref={ref}>
        <A4Background className={className}>
            <div className="w-[210mm] h-[297mm] px-10 py-6 bg-white shadow-md overflow-hidden">
                <ProfileList data={profile} />
                <ExperienceList data={experience} />
            </div>
        </A4Background>
    </div>
));

export default ResumeContent;