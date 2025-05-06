import React from "react";

import { BsImageFill } from "react-icons/bs";
import { RiSave3Fill } from "react-icons/ri";
import { TbLocationCancel } from "react-icons/tb";

import useEditWithUndo from "@/hooks/useEditWithUndo";
import useLocale from "@/hooks/useLocale";

import { formatTitle } from "@/helpers/CommonUtil";
import useModeStore from "@/stores/modeStore";

import { TEMPLATE_NAME_AVATAR, TEMPLATE_NAME_PLAIN } from "@/data/style";
import type { StyleData } from "@/types/style";

import FontSelectInput from "@/components/toolkit/FontSelectInput";
import StyleSlider from "@/components/toolkit/StyleSlider";

const SettingEditor: React.FC = () => {
    const { locale } = useLocale();

    const { setEditModeStore } = useModeStore();

    // DashBoard.tsx 统一 start，这里统一 confirm + cancel
    const { tempStore: tempStyleStore, confirmEdit: confirmEditStyle, cancelEdit: cancelEditStyle, updateTempValue: updateTempStyle } = useEditWithUndo('styleStore');
    const { confirmEdit: confirmEditProfile, cancelEdit: cancelEditProfile, updateTempValue: updateTempProfile } = useEditWithUndo('profileStore');
    const { confirmEdit: confirmEditEx, cancelEdit: cancelEditEx } = useEditWithUndo('experienceStore');

    const handleConfirmEdit = () => {
        confirmEditStyle();
        confirmEditProfile();
        confirmEditEx();
        setEditModeStore(false)
    }

    const handleCancelEdit = () => {
        cancelEditStyle();
        cancelEditProfile();
        cancelEditEx();
        setEditModeStore(false)
    }

    const handleTemplateChange = (newTemplate: string) => {
        updateTempStyle('template', newTemplate);
    };

    const handleFontStyleChange = (newFont: string) => {
        updateTempStyle('fontStyle', newFont);
    };

    const handleColorChange = (newColor: string) => {
        updateTempStyle('color', newColor);
    };

    const handleStyleChange = (key: keyof StyleData, value: number) => {
        updateTempStyle(`[${key}]`, value);
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                updateTempProfile('avatar', base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <div id="setting-editor">
                <button onClick={handleConfirmEdit} className="w-20 setting-button fixed top-4 left-6 max-md:bg-slate-200">
                    <div className="flex items-center">
                        <RiSave3Fill className="mr-2" />
                        <span className="text-xs">{locale.common.SAVE}</span>
                    </div>
                </button>

                <button onClick={handleCancelEdit} className="w-20 setting-button fixed top-4 left-32 max-md:left-28 max-md:bg-slate-200">
                    <div className="flex items-center">
                        <TbLocationCancel className="mr-2" />
                        <span className="text-xs">{locale.common.CANCEL}</span>
                    </div>
                </button>

                {/* 切换模板 */}
                <div className="flex items-center ml-8 mb-3 max-md:mt-16">
                    <h3 className="setting-title w-24">{locale.field.TEMPLATE}</h3>
                    <div className="flex items-center">
                        <label className="flex cursor-pointer w-24">
                            <input
                                type="radio"
                                value={TEMPLATE_NAME_AVATAR}
                                name="template"
                                checked={tempStyleStore.template === TEMPLATE_NAME_AVATAR}
                                onChange={(e) => handleTemplateChange(e.target.value)}
                                className="h-4 w-4 mr-2 cursor-pointer"
                            />
                            <span className="text-sm max-md:text-xs font-semibold text-slate-800">Avatar</span>
                        </label>
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="radio"
                                value={TEMPLATE_NAME_PLAIN}
                                name="template"
                                checked={tempStyleStore.template === TEMPLATE_NAME_PLAIN}
                                onChange={(e) => handleTemplateChange(e.target.value)}
                                className="h-4 w-4 mr-2 cursor-pointer"
                            />
                            <span className="text-sm max-md:text-xs font-semibold text-slate-800">Plain</span>
                        </label>
                    </div>
                </div>

                {/* 切换字体 */}
                <div className="flex items-center ml-8 mb-3">
                    <h3 className="setting-title w-20 max-sm:w-28">{locale.field.FONT_STYLE}</h3>
                    <div className="flex">
                        <FontSelectInput 
                            font={tempStyleStore.fontStyle ?? ""}
                            onChange={(font) => handleFontStyleChange(font)}
                        />
                    </div>
                </div>

                {/* 颜色选择器 */}
                <div className="flex items-center mx-8 my-3">
                    <h3 className="setting-title mr-4">{formatTitle(locale.field.COLOR)}</h3>
                    <div className="px-6 ml-24 max-md:ml-8">
                        <input
                            type="color"
                            value={tempStyleStore.color}
                            onChange={(e) => handleColorChange(e.target.value)}
                            className="w-8 h-8 rounded-sm bg-slate-200 p-0.5 cursor-pointer"
                        />
                    </div>
                </div>

                {/* 滑动修改样式 */}
                <div className="space-y-3 mx-8">
                    <div className="flex items-center">
                        <h3 className="setting-title w-48">{formatTitle(locale.field.PAGE_PADDING_Y)}</h3>
                        <StyleSlider
                            min={12} max={40}
                            value={tempStyleStore?.pagePy}
                            onChange={(newValue) => handleStyleChange('pagePy', newValue)}
                        />
                    </div>

                    <div className="flex items-center">
                        <h3 className="setting-title w-48">{formatTitle(locale.field.PROFILE_MARGIN_BOTTOM)}</h3>
                        <StyleSlider
                            min={8} max={24}
                            value={tempStyleStore.profileMb}
                            onChange={(newValue) => handleStyleChange('profileMb', newValue)}
                        />
                    </div>

                    <div className="flex items-center">
                        <h3 className="setting-title w-48">{formatTitle(locale.field.EXPERIENCE_MARGIN_BOTTOM)}</h3>
                        <StyleSlider
                            min={8} max={24}
                            value={tempStyleStore.experienceMb}
                            onChange={(newValue) => handleStyleChange('experienceMb', newValue)}
                        />
                    </div>

                    <div className="flex items-center">
                        <h3 className="setting-title w-48">{formatTitle(locale.field.DETAILS_FONT)}</h3>
                        <StyleSlider
                            min={14} max={16}
                            value={tempStyleStore.detailsFont}
                            onChange={(newValue) => handleStyleChange('detailsFont', newValue)}
                        />
                    </div>
                </div>

                {/* 上传图片 */}
                {tempStyleStore.template === TEMPLATE_NAME_AVATAR && (
                    <label className="flex items-center justify-center bg-slate-500 hover:bg-slate-600 text-white font-semibold py-2 px-6 rounded mx-8 my-8 cursor-pointer">
                        <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                        <BsImageFill className="mr-2 w-3 h-3" />
                        <span className="text-xs">{locale.common.UPLOAD_AVATAR}</span>
                    </label>
                )}

                {tempStyleStore.template === 'plain' && (
                    <>
                        <div className="mt-3 space-y-3 mx-8 max-md:mb-6">
                            <div className="flex items-center">
                                <h3 className="setting-title w-48">{formatTitle(locale.field.FOOTNOTE_PADDING_X)}</h3>
                                <StyleSlider
                                    min={8} max={40}
                                    value={tempStyleStore.plainFootPx}
                                    onChange={(newValue) => handleStyleChange('plainFootPx', newValue)}
                                />
                            </div>
                            <div className="flex items-center">
                                <h3 className="setting-title w-48">{formatTitle(locale.field.CONTACT_PADDING_X)}</h3>
                                <StyleSlider
                                    min={8} max={40}
                                    value={tempStyleStore.plainContactPx}
                                    onChange={(newValue) => handleStyleChange('plainContactPx', newValue)}
                                />
                            </div>
                        </div>
                    </>
                )}

            </div>
        </>
    )
}

export default SettingEditor;