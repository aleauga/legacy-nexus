export interface AppConfig {
    dbPath: string;
    host: string;
    port: number;
    debug: boolean;
    ivaRate: number;
    defaultCurrency: string;
    usdMxnRate: number;
}
export declare const appConfig: AppConfig;
