import React from 'react';

import A4Background from '@/components/layout/A4Background';
import ExperienceList from '@/components/templates/ExperienceList';
import ProfileList from '@/components/templates/ProfileList';
import useEditWithUndo from '@/hooks/useEditWithUndo';

const ResumeContent = React.forwardRef<HTMLDivElement, {}>((_, ref) => {
    const { tempStore: tempStyleStore } = useEditWithUndo('styleStore');
    const { tempStore: tempProfileStore } = useEditWithUndo('profileStore');
    const { tempStore: tempExperienceStore } = useEditWithUndo('experienceStore');

    return (
        <div ref={ref}>
            <A4Background>
                <div className="w-[210mm] h-[297mm] bg-white shadow-md overflow-hidden px-10"
                    style={{ paddingTop: tempStyleStore?.pagePy, paddingBottom: tempStyleStore?.pagePy }}
                >
                    <ProfileList data={tempProfileStore} marginBottom={tempStyleStore?.profileMb} />
                    <ExperienceList data={tempExperienceStore} marginBottom={tempStyleStore?.experienceMb} />
                </div>
            </A4Background >
        </div >
    );
});

export default ResumeContent;