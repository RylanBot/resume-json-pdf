import React, { useRef } from 'react';

import ReactToPrint from 'react-to-print';

import { BiCodeCurly } from 'react-icons/bi';
import { BsGithub } from 'react-icons/bs';
import { RiFilePdf2Line } from 'react-icons/ri';
import { TbDownload, TbSettings2, TbUpload } from 'react-icons/tb';

import ResumeContent from '@/components/layout/ResumeContent';
import SettingEditor from '@/components/toolkit/SettingEditor';

import useEditWithUndo from '@/hooks/useEditWithUndo';

import JsonService from '@/helpers/JsonService';

import useModeStore from '@/stores/modeStore';

const Dashboard: React.FC = () => {

    const { editModeStore, setEditModeStore } = useModeStore();
    const { startEditing: startEditingProfile } = useEditWithUndo('profileStore');
    const { startEditing: startEditingExperience } = useEditWithUndo('experienceStore');
    const { startEditing: startEditingStyle } = useEditWithUndo('styleStore');

    const printComponentRef = useRef<HTMLDivElement>(null);

    const { importJson, exportJson } = JsonService();

    const startEditing = () => {
        startEditingProfile();
        startEditingExperience()
        startEditingStyle();
        setEditModeStore(true);
    };

    const titleOffset = editModeStore ? "ml-80" : "";

    return (
        <div>

            {/* 顶部栏 */}
            <div className="fixed print-hidden w-full p-2 bg-slate-500 text-white flex justify-between items-center">
                {/* 左侧设置按钮 */}
                {!editModeStore && (
                    <div className="flex justify-start ml-4">
                        <button onClick={startEditing} className="setting-button fixed top-4 left-4 w-24">
                            <div className="flex items-center">
                                <TbSettings2 className="mr-2" />
                                <span className="text-xs">Setting</span>
                            </div>
                        </button>
                    </div>
                )}

                {/* 标题 */}
                <div className={`flex-grow flex justify-center items-center ${titleOffset} transition-all duration-500 ease-in-out`}>
                    <a className="flex items-center my-2"
                        href="https://github.com/RylanBot/resume-json-pdf" target="_blank" rel="noopener noreferrer">
                        <BsGithub className="w-8 h-8 mr-8" />
                        <p className="text-2xl font-bold">resume-json-pdf</p>
                    </a>
                </div>

                {/* 右侧按钮 */}
                {!editModeStore && (
                    <>
                        <div className='flex'>
                            {/* 导入 */}
                            <label className="setting-button fixed top-4 right-40 w-32 mr-4 cursor-pointer">
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
                                    <span className="text-xs">Import Json</span>
                                </div>
                            </label>

                            {/* 导出 */}
                            <div className="fixed top-4 mb-10 right-4">
                                <div className="group inline-block">
                                    <button className="setting-button w-36">
                                        <TbDownload className="mr-2" />
                                        <span className="text-xs">Export Options</span>
                                    </button>
                                    {/* 下拉选项 */}
                                    <div className="mt-1 w-36 rounded-md shadow-sm bg-white z-50 hidden group-hover:block">
                                        <div className="py-1">
                                            <button onClick={exportJson} className="p-2 text-sm font-semibold bg-white text-slate-800">
                                                <div className="flex items-center px-4 py-2">
                                                    <BiCodeCurly className="mr-2" />
                                                    <span className="text-xs">Export Json</span>
                                                </div>
                                            </button>
                                            <ReactToPrint
                                                trigger={() => (
                                                    <button className="p-2 text-sm font-semibold bg-white text-slate-800">
                                                        <div className="flex items-center px-4 py-2">
                                                            <RiFilePdf2Line className="mr-2" />
                                                            <span className="text-xs">Export PDF</span>
                                                        </div>
                                                    </button>
                                                )}
                                                content={() => printComponentRef.current}
                                            />
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

        </div >
    );
};

export default Dashboard;
