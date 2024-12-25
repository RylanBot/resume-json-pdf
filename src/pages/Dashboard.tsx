import React, { useRef } from 'react';

import { BiCodeCurly } from 'react-icons/bi';
import { BsGithub } from 'react-icons/bs';
import { TbBrandHtml5, TbDownload, TbSettings2, TbUpload } from 'react-icons/tb';

import ResumeContent from '@/components/layout/ResumeContent';
import SettingEditor from '@/components/layout/SettingEditor';
import LangSwitch from '@/components/toolkit/LangSwitch';
import LatestNotice from '@/components/toolkit/LatestNotice';
import PrintPdfButton from '@/components/toolkit/PrintPdfButton';

import { exportHtml, exportJson, importJson } from '@/helpers/FileService';

import useEditWithUndo from '@/hooks/useEditWithUndo';
import useLocale from '@/hooks/useLocale';

import useModeStore from '@/stores/modeStore';

const Dashboard: React.FC = () => {
    const { locale } = useLocale();

    const { editModeStore, setEditModeStore } = useModeStore();
    const { startEdit: startEditProfile } = useEditWithUndo('profileStore');
    const { startEdit: startEditExperience } = useEditWithUndo('experienceStore');
    const { startEdit: startEditStyle } = useEditWithUndo('styleStore');

    const printComponentRef = useRef<HTMLDivElement>(null);

    const handleStartEdit = () => {
        startEditProfile();
        startEditExperience()
        startEditStyle();
        setEditModeStore(true);
    };

    return (
        <div>
            {/* 顶部栏 */}
            <div className="fixed z-10 print-hidden w-full p-2 bg-slate-600 text-white flex justify-between items-center">
                {/* 左侧设置按钮 */}
                {!editModeStore && (
                    <div className="flex justify-start md:ml-4">
                        <button onClick={handleStartEdit} className="setting-button fixed top-4 max-sm:top-16 left-4 w-24">
                            <div className="flex items-center">
                                <TbSettings2 className="mr-2" />
                                <span className="text-xs">{locale.common.SETTING}</span>
                            </div>
                        </button>
                    </div>
                )}

                {/* 标题 */}
                <div className={`flex-grow flex justify-center items-center ${editModeStore ? "ml-80" : ""} transition-all duration-500 ease-in-out`}>
                    <a className="flex items-center my-2 mr-4"
                        href="https://github.com/RylanBot/resume-json-pdf" target="_blank" rel="noopener noreferrer">
                        <BsGithub className="w-6 h-6 mr-2" />
                        <p className="text-2xl font-bold max-sm:text-sm whitespace-nowrap">resume-json-pdf</p>
                    </a>
                    {/* 语言切换 */}
                    <LangSwitch />
                </div>

                {/* 右侧按钮 */}
                {!editModeStore && (
                    <>
                        <div className='flex'>
                            {/* 导入 */}
                            <label className="setting-button fixed top-4 max-sm:top-16 right-40 max-sm:right-32 w-32 mr-4 cursor-pointer">
                                <input
                                    type="file"
                                    accept=".json"
                                    onChange={(event) => {
                                        if (event.target.files && event.target.files[0]) {
                                            importJson(event.target.files[0]);
                                            event.target.value = ''; // 重置文件输入，否则文件不会再次触发 change 事件
                                        }
                                    }}
                                    className="hidden"
                                />
                                <div className="flex items-center">
                                    <TbUpload className="mr-2" />
                                    <span className="text-xs">{locale.common.IMPORT_JSON}</span>
                                </div>
                            </label>

                            {/* 导出 */}
                            <div className="fixed top-4 max-sm:top-16 mb-10 right-4">
                                <div className="group inline-block">
                                    <button className="setting-button w-36">
                                        <TbDownload className="mr-2" />
                                        <span className="text-xs">{locale.common.EXPORT_OPTIONS}</span>
                                    </button>
                                    {/* 下拉选项 */}
                                    <div className="mt-1 w-36 rounded-md shadow-sm bg-white z-50 hidden group-hover:block">
                                        <div className="py-1">
                                            <button onClick={exportJson} className="p-2 text-sm font-semibold bg-white text-slate-800">
                                                <div className="flex items-center px-5 py-1">
                                                    <BiCodeCurly className="mr-4" />
                                                    <span className="text-xs">JSON</span>
                                                </div>
                                            </button>
                                            <button onClick={exportHtml} className="p-2 text-sm font-semibold bg-white text-slate-800">
                                                <div className="flex items-center px-5 py-1">
                                                    <TbBrandHtml5 className="mr-4" />
                                                    <span className="text-xs">HTML</span>
                                                </div>
                                            </button>
                                            <PrintPdfButton printRef={printComponentRef}/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </>
                )}
            </div>

            {/* 简历内容 */}
            <ResumeContent ref={printComponentRef} />

            {/* 编辑窗 */}
            {editModeStore && <SettingEditor />}

            {/* 公告 */}
            {!editModeStore && <LatestNotice />}
        </div >
    );
};

export default Dashboard;