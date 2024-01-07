import React from "react";

import { BsImageFill } from "react-icons/bs";
import { RiSave3Fill } from "react-icons/ri";
import { TbLocationCancel } from "react-icons/tb";

import useEditWithUndo from "@/hooks/useEditWithUndo";
import useLocale from "@/hooks/useLocale";

import { formatTitle } from "@/helpers/LocaleService";

import useModeStore from "@/stores/modeStore";

import { StyleData } from "@/types/style";

import StyleSlider from "@/components/toolkit/StyleSlider";

const SettingEditor: React.FC = () => {
    const { locale } = useLocale();

    const { setEditModeStore } = useModeStore();
    const { confirmEdit: confirmEditProfile, cancelEdit: cancelEditProfile, updateTempData: updateTempProfile } = useEditWithUndo('profileStore');
    const { tempStore: tempStyleStore, confirmEdit: confirmEditStyle, cancelEdit: cancelEditStyle, updateTempData: updateTempStyle } = useEditWithUndo('styleStore');

    const confirmEdit = () => {
        confirmEditStyle();
        confirmEditProfile();
        setEditModeStore(false)
    }

    const cancelEdit = () => {
        cancelEditStyle();
        cancelEditProfile();
        setEditModeStore(false)
    }

    const handleTemplateChange = (newTemplate: string) => {
        updateTempStyle({ template: newTemplate });
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                updateTempProfile({ avatar: base64String });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleColorChange = (newColor: string) => {
        updateTempStyle({ color: newColor });
    };

    const handleStyleChange = (key: keyof StyleData, value: number) => {
        updateTempStyle({ [key]: value });
    };

    return (
        <>
            <div className="fixed top-16 z-5 w-80 overflow-y-auto max-h-screen px-4 py-2 transition-all duration-500 ease-in-out">
                <button onClick={confirmEdit} className="setting-button fixed top-4 left-6 w-20">
                    <div className="flex items-center">
                        <RiSave3Fill className="mr-2" />
                        <span className="text-xs">{locale.common.SAVE}</span>
                    </div>
                </button>

                <button onClick={cancelEdit} className="setting-button fixed top-4 left-32 w-20">
                    <div className="flex items-center">
                        <TbLocationCancel className="mr-2" />
                        <span className="text-xs">{locale.common.CANCEL}</span>
                    </div>
                </button>

                {/* 切换模板 */}
                <div className="flex items-center ml-8 mb-6">
                    <h3 className="setting-title mr-8">{locale.field.TEMPLATE}</h3>
                    <div className="flex items-center justify-center flex-grow">
                        <label className="flex items-center mr-4 cursor-pointer">
                            <input
                                type="radio"
                                value="avatar"
                                name="template"
                                checked={tempStyleStore?.template === 'avatar'}
                                onChange={(e) => handleTemplateChange(e.target.value)}
                                className="h-4 w-4 mr-1 cursor-pointer"
                            />
                            <span className="text-sm font-semibold text-slate-800">Avatar</span>
                        </label>
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="radio"
                                value="plain"
                                name="template"
                                checked={tempStyleStore?.template === 'plain'}
                                onChange={(e) => handleTemplateChange(e.target.value)}
                                className="h-4 w-4 mr-2 cursor-pointer"
                            />
                            <span className="text-sm font-semibold text-slate-800">Plain</span>
                        </label>
                    </div>
                </div>

                {/* 颜色选择器 */}
                <div className="flex items-center mx-8 my-6 mb-10">
                    <h3 className="setting-title mr-4">{formatTitle(locale.field.COLOR)}</h3>
                    <div className="px-6 ml-24">
                        <input
                            type="color"
                            value={tempStyleStore?.color}
                            onChange={(e) => { handleColorChange(e.target.value) }}
                            className="w-8 h-8 rounded bg-slate-200 p-1 cursor-pointer"
                        />
                    </div>
                </div>

                {/* 滑动修改样式 */}
                <div className="space-y-8 mx-8">
                    <div className="flex items-center">
                        <h3 className="setting-title mr-4 w-48">{formatTitle(locale.field.PAGE_PADDING_Y)}</h3>
                        <StyleSlider
                            min={12} max={40}
                            value={tempStyleStore?.pagePy}
                            onChange={(newValue) => handleStyleChange('pagePy', newValue)}
                        />
                    </div>

                    <div className="flex items-center">
                        <h3 className="setting-title mr-4 w-48">{formatTitle(locale.field.PROFILE_MARGIN_BOTTOM)}</h3>
                        <StyleSlider
                            min={0} max={24}
                            value={tempStyleStore?.profileMb}
                            onChange={(newValue) => handleStyleChange('profileMb', newValue)}
                        />
                    </div>

                    <div className="flex items-center">
                        <h3 className="setting-title mr-4 w-48">{formatTitle(locale.field.EXPERIENCE_MARGIN_BOTTOM)}</h3>
                        <StyleSlider
                            min={0} max={24}
                            value={tempStyleStore?.experienceMb}
                            onChange={(newValue) => handleStyleChange('experienceMb', newValue)}
                        />
                    </div>
                </div>

                {/* 上传图片 */}
                {tempStyleStore?.template === 'avatar' && (
                    <label className="flex items-center justify-center w-56 bg-slate-500 hover:bg-slate-600 text-white font-semibold py-2 px-6 rounded mx-8 my-12 cursor-pointer">
                        <input type="file" className="hidden" onChange={handleImageChange} />
                        <BsImageFill className="mr-2 w-3 h-3" />
                        <span className="text-xs">{locale.common.UPLOAD_AVATAR}</span>
                    </label>
                )}

                {tempStyleStore?.template === 'plain' && (
                    <>
                        <div className="space-y-8 mx-8 mt-8">
                            <div className="flex items-center">
                                <h3 className="setting-title mr-4 w-48">{formatTitle(locale.field.FOOTNOTE_PADDING_X)}</h3>
                                <StyleSlider
                                    min={8} max={40}
                                    value={tempStyleStore?.plainFootPx}
                                    onChange={(newValue) => handleStyleChange('plainFootPx', newValue)}
                                />
                            </div>
                            <div className="flex items-center">
                                <h3 className="setting-title mr-4 w-48">{formatTitle(locale.field.CONTACT_PADDING_X)}</h3>
                                <StyleSlider
                                    min={8} max={40}
                                    value={tempStyleStore?.plainContactPx}
                                    onChange={(newValue) => handleStyleChange('plainContactPx', newValue)}
                                />
                            </div>
                        </div>

                    </>
                )}

            </div >
        </>
    )
}

export default SettingEditor;