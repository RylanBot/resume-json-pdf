import React, { useMemo, useRef } from "react";

import { ExperienceData } from "@/stores/experience";
import { ProfileData } from "@/stores/profile";
import useStore from "@/stores/store";

import { MdCloudUpload } from "react-icons/md";

import ReactJson from "react-json-view";

const JsonEditorDrawer: React.FC = () => {
    const { profileStore, experienceStore, setProfileStore, setExperienceStore } = useStore();

    const memoizedProfileData = useMemo(() => {
        if (profileStore) return JSON.parse(JSON.stringify(profileStore));
    }, [profileStore]);

    const memoizedExperienceData = useMemo(() => {
        if (experienceStore) return JSON.parse(JSON.stringify(experienceStore));
    }, [experienceStore]);

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

    return (
        <div className="hide-scrollbar fixed top-16 z-5 w-96 overflow-y-auto max-h-screen px-4 py-2 transition-all duration-300 ease-in-out">
            <input
                type="file"
                accept=".json"
                onChange={importJson}
                className="hidden"
                ref={fileInputRef}
            />
            <button onClick={handleImportClick}
                className="fixed top-4 left-32 p-2 w-30 text-sm font-semibold bg-white text-sky-600 rounded-lg shadow-md flex items-center justify-center">
                <div className="flex items-center">
                    <MdCloudUpload className="mr-2" />
                    <span className="text-xs">Import Json</span>
                </div>
            </button>

            <div className=" ml-4">
                <div className="mb-8">
                    <h2 className="my-4 text-xl font-semibold text-sky-700">
                        Profile
                    </h2>
                    <ReactJson
                        style={{ background: 'transparent', fontSize: '15px' }}
                        name={null}
                        theme={'summerfruit:inverted'}
                        iconStyle={'square'}
                        indentWidth={0}
                        displayDataTypes={false}
                        displayObjectSize={false}
                        enableClipboard={false}
                        collapsed={4}
                        src={memoizedProfileData}
                        onEdit={(edit) => {
                            setProfileStore(edit.updated_src as ProfileData);
                        }}
                    />

                </div>

                <div>
                    <h2 className="my-4 text-xl font-semibold text-sky-700">
                        Experience
                    </h2>
                    <div className="mb-4">
                        <ReactJson
                            style={{ background: 'transparent', fontSize: '15px' }}
                            name={null}
                            theme={'summerfruit:inverted'}
                            iconStyle={'square'}
                            indentWidth={0}
                            displayDataTypes={false}
                            displayObjectSize={false}
                            enableClipboard={false}
                            collapsed={4}
                            src={memoizedExperienceData}
                            onEdit={(edit) => {
                                setExperienceStore(edit.updated_src as ExperienceData[]);
                            }}
                        />
                    </div>
                </div>

            </div>
        </div>
    );
}

export default JsonEditorDrawer;