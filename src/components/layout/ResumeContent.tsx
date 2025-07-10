import React from "react";

import useEditWithUndo from "@/hooks/useEditWithUndo";
import type { ExperienceData } from "@/types/data";

import { A4Background } from "../layout";
import { ExperienceList, ProfileList } from "../template";

const ResumeContent = React.forwardRef<HTMLDivElement, object>((_, ref) => {
  const { tempStore: tempStyleStore } = useEditWithUndo("styleStore");
  const { tempStore: tempProfileStore } = useEditWithUndo("profileStore");
  const { tempStore: tempExperienceStore } = useEditWithUndo("experienceStore");

  let currentPage = 1; // 默认为第一页

  // 自动为每个 section 填充 page，直到遇到新的 page 字段
  const experienceWithPage = tempExperienceStore.map((section) => {
    if (section.page) {
      currentPage = section.page;
    }

    return {
      ...section,
      page: section.page || currentPage,
    };
  });

  const experienceByPage = experienceWithPage.reduce((acc, section) => {
    const page = section.page || 1;
    if (!acc[page]) acc[page] = [];
    acc[page].push(section);
    return acc;
  }, {} as Record<number, ExperienceData[]>);

  const pages = Object.keys(experienceByPage)
    .map(Number)
    .sort((a, b) => a - b);

  return (
    <div id="export-html" ref={ref}>
      {pages.map((pageNum, index) => (
        <A4Background key={pageNum} page={pageNum}>
          <div
            style={
              {
                fontFamily: `${tempStyleStore.fontStyle}`,
                "--theme-color": tempStyleStore.color,
                "--page-py": `${tempStyleStore.pagePy}px`,
                "--profile-mb": `${tempStyleStore.profileMb}px`,
                "--experience-mb": `${tempStyleStore.experienceMb}px`,
                "--plain-footnote-px": `${tempStyleStore.plainFootPx}px`,
                "--plain-contact-px": `${tempStyleStore.plainContactPx}px`,
                "--font-base-size": `${tempStyleStore.detailsFont}px`,
              } as React.CSSProperties
            }
            className="w-[210mm] h-[297mm] bg-white overflow-hidden px-10 shadow-md custom-page"
          >
            {index === 0 && (
              <ProfileList
                data={tempProfileStore}
                theme={tempStyleStore.template}
              />
            )}
            <ExperienceList data={experienceByPage[pageNum]} />
          </div>
        </A4Background>
      ))}
    </div>
  );
});

export default ResumeContent;
