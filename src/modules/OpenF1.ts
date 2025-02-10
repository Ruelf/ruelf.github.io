import type { FilterByType } from '@/types/utility';
import { collect, type Collection } from '@/utils';
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

export interface Lap {
    date_start: string;
    driver_number: number;
    duration_sector_1: number;
    duration_sector_2: number;
    duration_sector_3: number;
    i1_speed: number;
    i2_speed: number;
    is_pit_out_lap: false;
    lap_duration: number;
    lap_number: number;
    meeting_key: number;
    segments_sector_1: number[];
    segments_sector_2: number[];
    segments_sector_3: number[];
    session_key: number;
    st_speed: number;
}

export interface Meeting {
    circuit_key: number;
    circuit_short_name: string;
    country_code: string;
    country_key: number;
    country_name: string;
    date_start: string;
    gmt_offset: string;
    location: string;
    meeting_key: number;
    meeting_name: string;
    meeting_official_name: string;
    year: number;
}

export interface Session {
    circuit_key: number;
    circuit_short_name: string;
    country_code: string;
    country_key: number;
    country_name: string;
    date_end: string;
    date_start: string;
    gmt_offset: string;
    location: string;
    meeting_key: number;
    session_key: number;
    session_name: string;
    session_type: string;
    year: number;
}

export class OpenF1 {
    private static async request<T>(path: string, params?: Params<T>): Promise<Collection<T>> {
        const response = await axios.request<T[]>({
            method: 'GET',
            baseURL: 'https://api.openf1.org/v1/',
            url: path,
            params,
            timeout: 5000,
            timeoutErrorMessage: 'OpenF1 server took too long to respond.',
        });

        return collect(response.data);
    }

    public static carData(params?: Params<CarData>): Promise<Collection<CarData>> {
        return this.request<CarData>('/car_data', params);
    }

    public static laps(params?: Params<Lap>): Promise<Collection<Lap>> {
        return this.request<Lap>('/laps', params);
    }

    public static meetings(params?: Params<Meeting>): Promise<Collection<Meeting>> {
        return this.request<Meeting>('/meetings', params);
    }

    public static sessions(params?: Params<Session>): Promise<Collection<Session>> {
        return this.request<Session>('/sessions', params);
    }
}
