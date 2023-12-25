import React, { useRef } from 'react';

import ReactToPrint from 'react-to-print';

import { BiCodeCurly } from 'react-icons/bi';
import { BsGithub } from 'react-icons/bs';
import { FaRegFilePdf } from 'react-icons/fa6';
import { TbDatabaseImport, TbSettings2 } from 'react-icons/tb';

import ResumeContent from '@/components/layout/ResumeContent';
import SettingEditor from '@/components/toolkit/SettingEditor';

import useEditWithUndo from '@/hooks/useEditWithUndo';

import JsonService from '@/helpers/JsonService';
import useModeStore from '@/stores/modeStore';

const buttonStyle = "p-2 text-sm font-semibold bg-white text-slate-800 rounded-lg shadow-md flex items-center justify-center"

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

    const titleOffset = editModeStore ? "ml-64" : "ml-52";

    return (
        <div>

            {/* 顶部栏 */}
            <div className="fixed print-hidden w-full p-2 bg-slate-500 text-white flex justify-between items-center">
                {/* 左侧设置按钮 */}
                {editModeStore ?
                    (<div className="w-24 ml-4 invisible">
                        {/* 占位符元素，与按钮相同宽度 */}
                    </div>) :
                    (<div className="flex justify-start ml-4">
                        <button onClick={startEditing} className={`${buttonStyle} w-24`}>
                            <div className="flex items-center">
                                <TbSettings2 className="mr-2" />
                                <span className="text-xs">Setting</span>
                            </div>
                        </button>
                    </div>)
                }

                {/* 标题 */}
                <div className={`flex-grow flex justify-center items-center ${titleOffset} transition-all duration-500 ease-in-out`}>
                    <a className="flex items-center my-2"
                        href="https://github.com/RylanBot/resume-json-pdf" target="_blank" rel="noopener noreferrer">
                        <BsGithub className="w-8 h-8 mr-2" />
                        <p className="text-2xl font-bold">resume-json-pdf</p>
                    </a>
                </div>

                {/* 右侧导入导出按钮 */}
                {!editModeStore && (
                    <>
                        <div className='flex'>
                            <label className={`${buttonStyle} w-32 mr-4 cursor-pointer`}>
                                <input
                                    type="file"
                                    accept=".json"
                                    onChange={(event) => {
                                        if (event.target.files && event.target.files[0]) {
                                            importJson(event.target.files[0]);
                                        }
                                    }}
                                    className="hidden"
                                />
                                <div className="flex items-center">
                                    <TbDatabaseImport className="mr-2" />
                                    <span className="text-xs">Import Json</span>
                                </div>
                            </label>
                            <div className="flex justify-start mr-4">
                                <button onClick={exportJson} className={`${buttonStyle} w-32`}>
                                    <div className="flex items-center">
                                        <BiCodeCurly className="mr-2" />
                                        <span className="text-xs">Export Json</span>
                                    </div>
                                </button>
                            </div>
                            <ReactToPrint
                                trigger={() => (
                                    <button className={`${buttonStyle} w-32 mr-4`}>
                                        <div className="flex items-center">
                                            <FaRegFilePdf className="mr-4" />
                                            <span className="text-xs">Export PDF</span>
                                        </div>
                                    </button>
                                )}
                                content={() => printComponentRef.current}
                            />
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
