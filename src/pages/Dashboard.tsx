import React, { useRef } from 'react';

import useStore from '@/stores/store';

import { BiCodeCurly } from 'react-icons/bi';
import { BsGithub } from 'react-icons/bs';
import { FaPencil, FaRegFilePdf } from 'react-icons/fa6';
import { RiSave3Fill } from 'react-icons/ri';

import JsonEditorDrawer from '@/components/JsonEditorDrawer';
import ResumeContent from '@/components/ResumeContent';

import ReactToPrint from 'react-to-print';

const Dashboard: React.FC = () => {

    const { editModeStore, profileStore, experienceStore, setEditModeStore } = useStore();
    const printComponentRef = useRef<HTMLDivElement>(null);

    function exportJson() {
        const data = {
            profile: profileStore,
            experience: experienceStore
        };
        const jsonString = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonString], { type: "application/json" });
        const href = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;
        link.download = "resume.json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
    };

    const resumeOffset = editModeStore ? "ml-96" : "";
    const titleOffset = editModeStore ? "ml-80" : "";

    return (
        <div>
            {/* 顶部栏 */}
            <div className="fixed print-hidden w-full p-2 bg-sky-500 text-white flex justify-between items-center">
                {/* 左侧按钮 */}
                <div className="flex justify-start ml-4">
                    <button
                        onClick={() => setEditModeStore(!editModeStore)}
                        className="p-2 w-30 font-semibold bg-white text-sky-600 rounded-lg shadow-md flex items-center justify-center">
                        <div className="flex items-center">
                            {editModeStore ? <RiSave3Fill className="mr-2" /> : <FaPencil className="mr-2" />}
                            <span className="text-xs">{editModeStore ? 'Save' : 'Edit Resume'}</span>
                        </div>
                    </button>
                </div>

                {/* 标题 */}
                <div className={`flex-grow flex justify-center items-center ${titleOffset} transition-all duration-500 ease-in-out`}>
                    <a className="flex items-center m-2"
                        href="https://github.com/RylanBot/resume-json-pdf" target="_blank" rel="noopener noreferrer">
                        <BsGithub className="w-8 h-8 mr-2" />
                        <p className="text-2xl font-bold">resume-json-pdf</p>
                    </a>
                </div>

                {/* 右侧按钮 */}
                <div className="flex justify-end mr-2">
                    {!editModeStore && (
                        <>
                            <button onClick={exportJson}
                                className="p-2 w-30 text-sm font-semibold bg-white text-sky-600 rounded-lg shadow-md flex items-center justify-center mr-4">
                                <div className="flex items-center">
                                    <BiCodeCurly className="mr-2" />
                                    <span className="text-xs">Export Json</span>
                                </div>
                            </button>
                            <ReactToPrint
                                trigger={() => (
                                    <button
                                        className={"p-2 w-30 text-sm font-semibold bg-white text-sky-600 rounded-lg shadow-md flex items-center justify-center"}>
                                        <div className="flex items-center">
                                            <FaRegFilePdf className="mr-2" />
                                            <span className="text-xs">Export PDF</span>
                                        </div>
                                    </button>
                                )}
                                content={() => printComponentRef.current}
                            />
                        </>
                    )}
                </div>
            </div>

            {/* 简历内容 */}
            <ResumeContent
                profile={profileStore}
                experience={experienceStore}
                className={resumeOffset}
                ref={printComponentRef} />

            {/* 编辑窗 */}
            {editModeStore && <JsonEditorDrawer />}
        </div>
    );
};

export default Dashboard;
