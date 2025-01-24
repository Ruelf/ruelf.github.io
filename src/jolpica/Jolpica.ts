import type { DriverTable, RaceTable, Response } from '@/types/jolpica';
import type { Json } from '@/types/utility';
import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';
import { Driver } from './Driver';
import { Pagination } from './Pagination';
import { Race } from './Race';

export interface ApiOptions {
    limit?: number;
    offset?: number;
}

export class Jolpica {
    static baseUrl: string = 'https://api.jolpi.ca/ergast/f1';

    public static async request<T extends Json>(path: string, config?: AxiosRequestConfig): Promise<Response<T>> {
        const response = await axios.get<Response<T>>(this.baseUrl + path + '.json', config);
        return response.data;
    }

    public static async getDrivers(options?: ApiOptions): Promise<Pagination<Driver>> {
        const { MRData } = await this.request<DriverTable>('/drivers', { params: options });

        return new Pagination(
            MRData,
            MRData.DriverTable.Drivers.map((driver) => new Driver(driver)),
        );
    }

    public static async getDriver(id: string, options?: ApiOptions): Promise<Driver | null> {
        const { MRData } = await this.request<DriverTable>(`/drivers/${id}`, { params: options });

        return +MRData.total == 0 ? null : new Driver(MRData.DriverTable.Drivers[0]);
    }

    public static async getRacesWithResultsForDriver(driver: Driver, options?: ApiOptions): Promise<Pagination<Race>> {
        const { MRData } = await this.request<RaceTable>(`/drivers/${driver.id}/results`, { params: options });

        return new Pagination(
            MRData,
            MRData.RaceTable.Races.map((race) => new Race(race)),
        );
    }
}
