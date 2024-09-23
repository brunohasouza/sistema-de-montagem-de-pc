import { AdapterResponse } from './adapter-response';

export interface Adapter {
    get<T>(url: string): Promise<AdapterResponse<T>>;
}
