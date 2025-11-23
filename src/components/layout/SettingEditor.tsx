import { useMemo } from "react";

import { Editor } from "@monaco-editor/react";
import { BsImageFill } from "react-icons/bs";
import { RiSave3Fill } from "react-icons/ri";
import { TbLocationCancel } from "react-icons/tb";

import useEditWithUndo from "@/hooks/useEditWithUndo";
import useLocale from "@/hooks/useLocale";

import useDataStore from "@/stores/dataStore";
import useModeStore from "@/stores/modeStore";

import { formatTitle } from "@/helpers/CommonUtil";
import { messageContainer } from "@/helpers/MessageContainer";

import { TEMPLATE_NAME_AVATAR, TEMPLATE_NAME_PLAIN } from "@/data";
import type { StyleData } from "@/types/data";

import { EditorModeToggle, FontSelectInput, StyleSlider } from "../toolkit";

const JSON_ERROR_MSG_ID = "json-error";

const SettingEditor: React.FC = () => {
  const { locale } = useLocale();

  const { isJsonMode, setIsEditMode } = useModeStore();
  const { setTempStore } = useDataStore.getState();

  // DashBoard 统一 start，这里统一 confirm + cancel
  const {
    tempStore: tempStyleStore,
    confirmEdit: confirmEditStyle,
    cancelEdit: cancelEditStyle,
    updateTempValue: updateTempStyle
  } = useEditWithUndo("styleStore");
  const {
    tempStore: tempProfileStore,
    confirmEdit: confirmEditProfile,
    cancelEdit: cancelEditProfile,
    updateTempValue: updateTempProfile
  } = useEditWithUndo("profileStore");
  const {
    tempStore: tempExperienceStore,
    confirmEdit: confirmEditEx,
    cancelEdit: cancelEditEx
  } = useEditWithUndo("experienceStore");

  const jsonString = useMemo(() => {
    return JSON.stringify(
      {
        style: tempStyleStore,
        profile: tempProfileStore,
        experience: tempExperienceStore
      },
      null,
      2
    );
  }, [tempStyleStore, tempProfileStore, tempExperienceStore]);

  const handleCancelEdit = () => {
    messageContainer.remove(JSON_ERROR_MSG_ID);
    cancelEditStyle();
    cancelEditProfile();
    cancelEditEx();
    setIsEditMode(false);
  };

  const handleConfirmEdit = () => {
    messageContainer.remove(JSON_ERROR_MSG_ID);
    confirmEditStyle();
    confirmEditProfile();
    confirmEditEx();
    setIsEditMode(false);
  };

  const handleStyleChange = (key: keyof StyleData, value: number | string) => {
    updateTempStyle(`[${key}]`, value);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        updateTempProfile("avatar", base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleJsonChange = (str: string) => {
    try {
      const parsedJson = JSON.parse(str);
      messageContainer.remove(JSON_ERROR_MSG_ID);
      // TODO: 局部更新
      if (parsedJson.style) {
        setTempStore("styleStore", parsedJson.style);
      }
      if (parsedJson.profile) {
        setTempStore("profileStore", parsedJson.profile);
      }
      if (parsedJson.experience) {
        setTempStore("experienceStore", parsedJson.experience);
      }
    } catch {
      messageContainer.info("Invalid JSON format", {
        id: JSON_ERROR_MSG_ID,
        duration: 0
      });
    }
  };

  return (
    <>
      <div className="z-20 fixed top-4 max-md:top-16 max-md:mt-0.5">
        <EditorModeToggle />
        <button
          onClick={handleCancelEdit}
          className="setting-button w-24 right-36 max-md:right-28"
        >
          <div className="flex items-center">
            <TbLocationCancel className="mr-4" />
            <span>{locale.common.CANCEL}</span>
          </div>
        </button>
        <button
          onClick={handleConfirmEdit}
          className="setting-button w-24 right-4 max-md:right-6"
        >
          <div className="flex items-center">
            <RiSave3Fill className="mr-4" />
            <span>{locale.common.SAVE}</span>
          </div>
        </button>
      </div>

      <div id="setting-editor">
        {isJsonMode ? (
          <div className="mt-1 overflow-hidden h-[90vh]">
            <Editor
              language="json"
              value={jsonString}
              onChange={(value) => handleJsonChange(value ?? "")}
              options={{
                automaticLayout: true,
                minimap: { enabled: false },
                scrollbar: {
                  verticalScrollbarSize: 5,
                  horizontalScrollbarSize: 5,
                  verticalSliderSize: 5,
                  horizontalSliderSize: 5
                }
              }}
            />
          </div>
        ) : (
          <>
            {/* 模板 */}
            <div className="flex justify-between items-center mx-8 mb-3">
              <h3 className="setting-title">{locale.field.TEMPLATE}</h3>
              <div className="flex items-center">
                <label className="flex cursor-pointer mr-6">
                  <input
                    className="h-4 w-4 mr-2 cursor-pointer"
                    type="radio"
                    name="template"
                    value={TEMPLATE_NAME_AVATAR}
                    checked={tempStyleStore.template === TEMPLATE_NAME_AVATAR}
                    onChange={(e) =>
                      handleStyleChange("template", e.target.value)
                    }
                  />
                  <span className="text-sm max-md:text-xs font-semibold text-slate-800">
                    Avatar
                  </span>
                </label>
                <label className="flex cursor-pointer">
                  <input
                    className="h-4 w-4 mr-2 cursor-pointer"
                    type="radio"
                    name="template"
                    value={TEMPLATE_NAME_PLAIN}
                    checked={tempStyleStore.template === TEMPLATE_NAME_PLAIN}
                    onChange={(e) =>
                      handleStyleChange("template", e.target.value)
                    }
                  />
                  <span className="text-sm max-md:text-xs font-semibold text-slate-800">
                    Plain
                  </span>
                </label>
              </div>
            </div>

            {/* 字体 */}
            <div className="flex justify-between items-center mx-8 mb-3">
              <h3 className="setting-title">{locale.field.FONT_STYLE}</h3>
              <FontSelectInput
                font={tempStyleStore.fontStyle ?? ""}
                onChange={(val) => handleStyleChange("fontStyle", val)}
              />
            </div>

            {/* 颜色 */}
            <div className="flex justify-between items-center mx-8 my-3">
              <h3 className="setting-title">
                {formatTitle(locale.field.COLOR)}
              </h3>
              <input
                className="w-8 h-8 rounded-sm bg-slate-200 p-0.5 cursor-pointer"
                type="color"
                value={tempStyleStore.color}
                onChange={(e) => handleStyleChange("color", e.target.value)}
              />
            </div>

            {/* 边距 */}
            <div className="space-y-3 mx-8">
              <div className="flex justify-between items-center">
                <h3 className="setting-title">
                  {formatTitle(locale.field.PAGE_PADDING_Y)}
                </h3>
                <StyleSlider
                  min={12}
                  max={40}
                  value={tempStyleStore.pagePy}
                  onChange={(v) => handleStyleChange("pagePy", v)}
                />
              </div>

              <div className="flex justify-between items-center">
                <h3 className="setting-title">
                  {formatTitle(locale.field.PROFILE_MARGIN_BOTTOM)}
                </h3>
                <StyleSlider
                  min={8}
                  max={24}
                  value={tempStyleStore.profileMb}
                  onChange={(v) => handleStyleChange("profileMb", v)}
                />
              </div>

              <div className="flex justify-between items-center">
                <h3 className="setting-title">
                  {formatTitle(locale.field.EXPERIENCE_MARGIN_BOTTOM)}
                </h3>
                <StyleSlider
                  min={8}
                  max={24}
                  value={tempStyleStore.experienceMb}
                  onChange={(v) => handleStyleChange("experienceMb", v)}
                />
              </div>

              <div className="flex justify-between items-center">
                <h3 className="setting-title">
                  {formatTitle(locale.field.DETAILS_FONT)}
                </h3>
                <StyleSlider
                  min={14}
                  max={16}
                  value={tempStyleStore.detailsFont}
                  onChange={(v) => handleStyleChange("detailsFont", v)}
                />
              </div>
            </div>

            {/* 头像 */}
            {tempStyleStore.template === TEMPLATE_NAME_AVATAR && (
              <label className="flex justify-center items-center bg-slate-500 hover:bg-slate-600 text-white font-semibold py-2 px-6 rounded mx-8 my-8 cursor-pointer">
                <input
                  className="hidden"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <BsImageFill className="mr-2 w-3 h-3" />
                <span className="text-xs">{locale.common.UPLOAD_AVATAR}</span>
              </label>
            )}

            {/* Plain 模板额外的配置 */}
            {tempStyleStore.template === "plain" && (
              <div className="mt-3 space-y-3 mx-8 max-md:mb-6">
                <div className="flex justify-between items-center">
                  <h3 className="setting-title">
                    {formatTitle(locale.field.FOOTNOTE_PADDING_X)}
                  </h3>
                  <StyleSlider
                    min={8}
                    max={40}
                    value={tempStyleStore.plainFootPx}
                    onChange={(v) => handleStyleChange("plainFootPx", v)}
                  />
                </div>

                <div className="flex justify-between items-center">
                  <h3 className="setting-title">
                    {formatTitle(locale.field.CONTACT_PADDING_X)}
                  </h3>
                  <StyleSlider
                    min={8}
                    max={40}
                    value={tempStyleStore.plainContactPx}
                    onChange={(v) => handleStyleChange("plainContactPx", v)}
                  />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default SettingEditor;
