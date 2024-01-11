import { useEffect } from "react";

import useDataStore, { TempStore } from "@/stores/dataStore";

import { ExperienceData } from "@/types/experience";
import { ProfileData } from "@/types/profile";
import { StyleData } from "@/types/style";

/* 只暴露 temp data 实现页面预览 */
function useEditWithUndo<K extends keyof TempStore>(key: K) {
    const { setTempStore, resetTempStore, [key]: originalStore, tempStores } = useDataStore();

    // 依赖真正 data，确保数据一致
    useEffect(() => {
        setTempStore(key, originalStore);
    }, [originalStore]);

    const originalSetters = {
        profileStore: useDataStore.getState().setProfileStore,
        experienceStore: useDataStore.getState().setExperienceStore,
        styleStore: useDataStore.getState().setStyleStore,
    } as Record<K, (newValue: StyleData | ProfileData | ExperienceData[]) => void>;

    const startEdit = () => {
        setTempStore(key, originalStore);
    };

    const confirmEdit = () => {
        const setter = originalSetters[key];
        const value = tempStores[key];
        if (setter && value) {
            setter(value);
        }
    };

    const cancelEdit = () => {
        resetTempStore(key);
    };

    const updateTempData = (newData: Partial<TempStore[K]>) => {
        setTempStore(key, { ...tempStores[key], ...newData });
    };

    return { tempStore: tempStores[key], startEdit, confirmEdit, cancelEdit, updateTempData };
}

export default useEditWithUndo;