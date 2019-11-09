import { ICacheStorage, CacheOptions } from '@wora/cache-persist';
import IDBStorage, { IOnUpgrade } from '@wora/cache-persist/lib/idbstorage';
import { EnvironmentConfig } from 'relay-runtime/lib/store/RelayModernEnvironment';
import { Store, RecordSource } from '@wora/relay-store';
import { Scheduler, OperationLoader } from 'relay-runtime/lib/store/RelayStoreTypes';
import RelayModernEnvironment from './RelayModernEnvironment';
import { CacheOptionsStore } from '@wora/relay-store/lib/Store';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type EnvironmentOfflineConfig = Omit<EnvironmentConfig, 'store'>; // Equivalent to: {b: number, c: boolean}

class EnvironmentIDB {
    public static create(
        config: EnvironmentOfflineConfig,
        idbOptions: {
            name?: string;
            onUpgrade?: IOnUpgrade;
            version?: number;
        } = {},
        recordSourceOptions: CacheOptions = {},
        storeOptions: {
            persistOptions?: CacheOptionsStore;
            gcScheduler?: Scheduler;
            operationLoader?: OperationLoader;
            getDataID?: any; // do not use
        } = {},
        offlineStoreOptions: CacheOptions = {},
    ): RelayModernEnvironment {
        let idbStore: CacheOptions;
        let idbRecords: CacheOptions;
        let idbOffline: CacheOptions;
        const { gcScheduler, operationLoader, getDataID, persistOptions } = storeOptions;
        if (typeof window !== 'undefined') {
            const { name = 'relay', onUpgrade, version } = idbOptions;
            const idbStorages: ICacheStorage[] = IDBStorage.create({
                name,
                storeNames: ['store', 'records', 'offline'],
                onUpgrade,
                version,
            });

            idbStore = {
                storage: idbStorages[0],
                serialize: false,
                prefix: null,
                ...persistOptions,
            };

            idbRecords = {
                storage: idbStorages[1],
                serialize: false,
                prefix: null,
                ...recordSourceOptions,
            };

            idbOffline = {
                storage: idbStorages[2],
                serialize: false,
                prefix: null,
                ...offlineStoreOptions,
            };
        }
        const recordSource = new RecordSource(idbRecords);
        const store = new Store(recordSource, idbStore, gcScheduler, operationLoader, getDataID);
        return new RelayModernEnvironment({ ...config, store }, idbOffline);
    }
}

export default EnvironmentIDB;