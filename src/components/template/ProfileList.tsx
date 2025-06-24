import { useEffect, useState } from "react";

import { TEMPLATE_NAME_AVATAR, TEMPLATE_NAME_PLAIN } from "@/data";
import type { ProfileData } from "@/types/data";

import { EditableText } from "../toolkit";

interface ProfileListProps {
  data: ProfileData;
  theme?: string;
}

const ProfileListAvatar: React.FC<ProfileListProps> = ({ data }) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    if (!data.avatar) return;
    const img = new Image();
    img.src = data.avatar;
    img.onload = () => setImgLoaded(true);
  }, [data.avatar]);

  return (
    <div className="flex justify-between items-center custom-profile">
      <div className="flex items-center">
        {data.avatar &&
          (imgLoaded ? (
            <div className="w-[80px] h-[100px] mr-6">
              <img src={data.avatar} className="w-full h-full" />
            </div>
          ) : (
            <div className="w-[80px] h-[100px] mr-6 bg-gray-200 loading-pulse" />
          ))}
        <div className="ml-2">
          <p className="text-xl mt-1 mb-3 theme-text-color">
            {data.name && (
              <EditableText
                text={data.name}
                path={`profile.name`}
                className={"font-bold"}
              />
            )}
          </p>
          {data.footnote?.map((note, noteIndex) => (
            <p className="text-sm mt-2" key={noteIndex}>
              <EditableText
                text={note}
                path={`profile.footnote[${noteIndex}].label`}
              />
            </p>
          ))}
        </div>
      </div>

      <div className="flex flex-col ml-20 mt-2 text-[12.75px]">
        {data.contact?.map((contact, conIndex) => (
          <p className="flex" key={conIndex}>
            {contact.icon && (
              <EditableText
                type={"icon"}
                text={contact.icon.trim()}
                path={`profile.contact[${conIndex}].icon`}
                className="w-4 h-4 mr-1 theme-text-color"
              />
            )}
            {contact.value && (
              <EditableText
                text={contact.value}
                path={`profile.contact[${conIndex}].value`}
              />
            )}
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
        <p className="text-xl font-bold text-gray-800 text-center mt-2 theme-text-color">
          {data.name && <EditableText text={data.name} path={`profile.name`} />}
        </p>

        {data.footnote && data.footnote?.length > 0 && (
          <div className="flex flex-wrap justify-center items-center text-sm gap-1 mt-1">
            {data.footnote?.map((note, noteIndex) => (
              <div
                className="flex justify-center items-center plain-footnote-item"
                key={noteIndex}
                style={{ flexBasis: "auto" }}
              >
                <div className="flex justify-center items-center">
                  <EditableText
                    text={note}
                    path={`profile.footnote[${noteIndex}].label`}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-wrap justify-center items-center text-[13.5px] mt-1">
          {data.contact?.map((item, index) => (
            <div
              className="flex justify-center items-center plain-contact-item"
              key={index}
              style={{ flexBasis: "auto" }}
            >
              <div className="flex items-center">
                {item.icon && (
                  <EditableText
                    type={"icon"}
                    text={item.icon.trim()}
                    path={`profile.contact[${index}].icon`}
                    className="w-4 h-4 mr-0.5 theme-text-color"
                  />
                )}
                {item.value && (
                  <EditableText
                    text={item.value}
                    path={`profile.contact[${index}].value`}
                  />
                )}
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
    case TEMPLATE_NAME_AVATAR:
      return <ProfileListAvatar data={data} />;
    case TEMPLATE_NAME_PLAIN:
      return <ProfileListPlain data={data} />;
    default:
      return <ProfileListAvatar data={data} />;
  }
};

export default ProfileList;
