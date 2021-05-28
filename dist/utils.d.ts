declare function deb<Params extends any[]>(func: (...args: Params) => any, timeout: number): (...args: Params) => void;
export declare const debounce: typeof deb;
export {};
