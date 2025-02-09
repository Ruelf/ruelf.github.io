import type { FilterByType } from '@/types/utility';
import axios from 'axios';

type Params<T> = Partial<FilterByType<T, string | number | boolean>>;

export interface CarData {
    brake: number;
    date: string;
    driver_number: number;
    drs: number;
    meeting_key: number;
    n_gear: number;
    rpm: number;
    session_key: number;
    speed: number;
    throttle: number;
}

export class OpenF1 {
    private static async request<T>(path: string, params?: Params<T>): Promise<T[]> {
        const response = await axios.request<T[]>({
            method: 'GET',
            baseURL: 'https://api.openf1.org/v1/',
            url: path,
            params,
            timeout: 5000,
            timeoutErrorMessage: 'OpenF1 server took too long to respond.',
        });

        return response.data;
    }

    public static carData(params?: Params<CarData>): Promise<CarData[]> {
        return this.request<CarData>('/car_data', params);
    }
}
