export default function createAsyncCacher(): <K = any>(fn: Function, ...args: any[]) => Promise<K>;
