export interface AppConfig {
  dbPath: string;
  host: string;
  port: number;
  debug: boolean;
  ivaRate: number;
  defaultCurrency: string;
  usdMxnRate: number;
}

export const appConfig: AppConfig = {
  dbPath: 'data/legacy.db',
  host: '0.0.0.0',
  port: 5000,
  debug: true,
  ivaRate: 0.16,
  defaultCurrency: 'MXN',
  usdMxnRate: 17.5,
};
