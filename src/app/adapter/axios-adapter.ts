import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Adapter } from './adapter';
import { AdapterResponse } from './adapter-response';

export class AxiosAdapter implements Adapter {
    private axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: 'http://localhost:3000',
        });
    }

    async get<T>(url: string): Promise<AdapterResponse<T>> {
        let response: AxiosResponse;

        try {
            response = await this.axiosInstance.get(url);
        } catch (error) {
            response = error as AxiosResponse;
        }

        return {
            statusCode: response.request.status,
            data: response.data,
        };
    }
}
