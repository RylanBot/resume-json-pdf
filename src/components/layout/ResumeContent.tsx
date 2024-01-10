import React from 'react';

import A4Background from '@/components/toolkit/A4Background';
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
                <div style={{
                    "--theme-color": tempStyleStore.color,
                    "--page-py": `${tempStyleStore.pagePy}px`,
                    "--profile-mb": `${tempStyleStore.profileMb}px`,
                    "--experience-mb": `${tempStyleStore.experienceMb}px`,
                    "--plain-footnote-px": `${tempStyleStore.plainFootPx}px`,
                    "--plain-contact-px": `${tempStyleStore.plainContactPx}px`
                } as React.CSSProperties}
                    className="w-[210mm] h-[297mm] bg-white overflow-hidden px-10 shadow-md custom-page"
                >
                    <ProfileList data={tempProfileStore} theme={tempStyleStore.template} />
                    <ExperienceList data={tempExperienceStore} />
                </div>
            </A4Background >
        </div >
    );
});

export default ResumeContent;