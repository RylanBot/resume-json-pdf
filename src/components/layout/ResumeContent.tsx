import React, { useMemo } from "react";

import useEditWithUndo from "@/hooks/useEditWithUndo";
import type { ExperienceData } from "@/types/data";

import { A4Background } from "../layout";
import { ExperienceList, ProfileList } from "../template";

const ResumeContent = React.forwardRef<HTMLDivElement, object>((_, ref) => {
  const { tempStore: tempStyleStore } = useEditWithUndo("styleStore");
  const { tempStore: tempProfileStore } = useEditWithUndo("profileStore");
  const { tempStore: tempExperienceStore } = useEditWithUndo("experienceStore");

  const experienceByPage = useMemo(() => {
    const map: Record<number, ExperienceData[]> = {};
    let maxPage = 1;

    tempExperienceStore.forEach((section) => {
      const page = section.page ?? 1;
      maxPage = Math.max(maxPage, page);
      if (!map[page]) map[page] = [];
      map[page].push(section);
    });

    return { map, maxPage };
  }, [tempExperienceStore]);

  const styleProps: React.CSSProperties = useMemo(
    () =>
      ({
        fontFamily: tempStyleStore.fontStyle,
        "--theme-color": tempStyleStore.color,
        "--page-py": `${tempStyleStore.pagePy}px`,
        "--profile-mb": `${tempStyleStore.profileMb}px`,
        "--experience-mb": `${tempStyleStore.experienceMb}px`,
        "--plain-footnote-px": `${tempStyleStore.plainFootPx}px`,
        "--plain-contact-px": `${tempStyleStore.plainContactPx}px`,
        "--font-base-size": `${tempStyleStore.detailsFont}px`
      } as React.CSSProperties),
    [tempStyleStore]
  );

  return (
    <div id="export-html" ref={ref}>
      {Array.from({ length: experienceByPage.maxPage }, (_, i) => i + 1).map(
        (pageNum, index) => (
          <A4Background key={pageNum} page={pageNum}>
            <div
              style={styleProps}
              className="w-[210mm] h-[297mm] bg-white overflow-hidden px-10 shadow-md custom-page"
            >
              {index === 0 && (
                <ProfileList
                  data={tempProfileStore}
                  theme={tempStyleStore.template}
                />
              )}
              <ExperienceList data={experienceByPage.map[pageNum] ?? []} />
            </div>
          </A4Background>
        )
      )}
    </div>
  );
});

export default ResumeContent;
