export declare class MemoryCacheService {
    private readonly cache;
    get<T>(key: string): T | null;
    set<T>(key: string, value: T): void;
    delete(key: string): boolean;
    clear(): void;
    has(key: string): boolean;
}
