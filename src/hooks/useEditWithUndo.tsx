import { useEffect } from "react";
import _ from 'lodash';

import useDataStore, { TempStore } from "@/stores/dataStore";

import { ExperienceData } from "@/types/experience";
import { ProfileData } from "@/types/profile";
import { StyleData } from "@/types/style";

/**
 * 只暴露 temp data 实现页面预览
 * @param storeType 具体的 store 类型 (style/profile/experience)
 */
function useEditWithUndo<K extends keyof TempStore>(storeType: K) {
    const { setTempStore, resetTempStore, [storeType]: originalStore, tempStores } = useDataStore();

    // 依赖真正 data，确保数据一致
    useEffect(() => {
        setTempStore(storeType, originalStore);
    }, [originalStore]);

    const originalSetters = {
        profileStore: useDataStore.getState().setProfileStore,
        experienceStore: useDataStore.getState().setExperienceStore,
        styleStore: useDataStore.getState().setStyleStore,
    } as Record<K, (newValue: StyleData | ProfileData | ExperienceData[]) => void>;

    const startEdit = () => {
        setTempStore(storeType, originalStore);
    };

    const confirmEdit = () => {
        const setter = originalSetters[storeType];
        const value = tempStores[storeType];
        if (setter && value) {
            setter(value);
        }
    };

    const cancelEdit = () => {
        resetTempStore(storeType);
    };

    /**
     * 局部更新 JSON 指定嵌套数组的某项
     * @param subPath 字段所在路径
     * @param newText 更新值
     */
    const updateTempValue = (subPath: string, newText: string | number) => {
        const updatedStore = _.cloneDeep(tempStores[storeType]);
        _.set(updatedStore, subPath, newText);
        setTempStore(storeType, updatedStore);
    };

    return { tempStore: tempStores[storeType], startEdit, confirmEdit, cancelEdit, updateTempValue };
}

export default useEditWithUndo;