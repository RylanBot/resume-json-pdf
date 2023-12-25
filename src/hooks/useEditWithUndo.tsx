import useDataStore, { TempStore } from "@/stores/dataStore";
import { useEffect } from "react";

/* 页面传参进行预览显示的时候不使用真正的 data，只暴露 temp data */
function useEditWithUndo<K extends keyof TempStore>(key: K) {
    const { setTempStore, resetTempStore, [key]: originalStore, tempStores } = useDataStore();

    useEffect(() => {
        setTempStore(key, originalStore);
    }, [originalStore]);

    const originalSetters = {
        profileStore: useDataStore.getState().setProfileStore,
        experienceStore: useDataStore.getState().setExperienceStore,
        styleStore: useDataStore.getState().setStyleStore,
    } as Record<K, (newValue: any) => void>;;

    const startEditing = () => {
        setTempStore(key, originalStore);
    };

    const confirmEdit = () => {
        const setter = originalSetters[key];
        if (setter) {
            setter(tempStores[key]);
        }
    };

    const cancelEdit = () => {
        resetTempStore(key);
    };

    const updateTempData = (newData: Partial<TempStore[K]>) => {
        setTempStore(key, { ...tempStores[key], ...newData });
    };

    return { tempStore: tempStores[key], startEditing, confirmEdit, cancelEdit, updateTempData };
}

export default useEditWithUndo;