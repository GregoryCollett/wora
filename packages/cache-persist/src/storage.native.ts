import { AsyncStorage } from 'react-native';
import { DataCache, Storage } from './Cache';
import { ItemCache } from './StorageProxy';


function NativeStorage(): Storage {
    return {
        multiRemove: (keys) => {
            return AsyncStorage.multiRemove(keys);
        },
        multiGet: (keys) => {
            return AsyncStorage.multiGet(keys).then((data: Array<Array<string>>): DataCache => {
                const result: DataCache = {};
                for (var i = 0; i < data.length; i++) {
                    const itemStorage = data[i];
                    const key = itemStorage[0];
                    const value = itemStorage[1];
                    const item = this.get(key, value)
                    result[item.key] = item.value;
                }
                return result;
            });
        },
        getAllKeys: (): Promise<Array<string>> => {
            return AsyncStorage.getAllKeys();
        },
        multiSet: (items: Array<ItemCache<any>>) => {
            const asyncItems = [];
            items.forEach(function (item) {
                asyncItems.push([item.key, item.value])
            });
            return AsyncStorage.multiSet(asyncItems);
        },
        setItem: (key: string, value: string): Promise<void> => {
            return AsyncStorage.setItem(key, value)
        },
        removeItem: (key: string): Promise<void> => {
            return AsyncStorage.removeItem(key);
        },
    }
}

export default NativeStorage;