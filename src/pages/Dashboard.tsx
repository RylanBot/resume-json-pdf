import { useRef } from 'react';

import useStore from '@/stores/store';

import { BiCodeCurly } from 'react-icons/bi';
import { BsGithub } from 'react-icons/bs';
import { FaRegFilePdf } from 'react-icons/fa6';

import ResumeContent from '@/components/layout/ResumeContent';
import SettingEditor from '@/components/toolkit/SettingEditor';

import { FiDownload } from 'react-icons/fi';
import ReactToPrint from 'react-to-print';

const Dashboard = () => {
    const { editModeStore, profileStore, experienceStore, setProfileStore, setExperienceStore } = useStore();

    const printComponentRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleImportClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    function importJson(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files && event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event: ProgressEvent<FileReader>) => {
                const content = event.target!.result;
                const json = JSON.parse(content as string);
                const profileJson = json.profile;
                const experienceJson = json.experience;
                setProfileStore(profileJson)
                setExperienceStore(experienceJson)
            };
            reader.readAsText(file);
        }
    };

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
                    <button onClick={exportJson}
                        className="p-2 w-30 text-sm font-semibold bg-white text-slate-500 rounded-lg shadow-md flex items-center justify-center">
                        <div className="flex items-center">
                            <FiDownload className="mr-2" />
                            <span className="text-xs">Download Template</span>
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
                    <input
                        type="file"
                        accept=".json"
                        onChange={importJson}
                        className="hidden"
                        ref={fileInputRef}
                    />
                    <button
                        onClick={handleImportClick}
                        className="p-2 mr-4 w-30 font-semibold bg-white text-sky-600 rounded-lg shadow-md flex items-center justify-center">
                        <div className="flex items-center">
                            <BiCodeCurly className="mr-2" />
                            <span className="text-xs">Import Json</span>
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
                </div>
            </div>

            {/* 简历内容 */}
            <ResumeContent
                profile={profileStore}
                experience={experienceStore}
                className={resumeOffset}
                ref={printComponentRef}
            />

            {/* 编辑窗 */}
            {editModeStore && <SettingEditor />}
        </div>
    );
};

export default Dashboard;
