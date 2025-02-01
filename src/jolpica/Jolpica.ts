import type { MRData, Response } from '@/types/jolpica';
import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';
import { Driver, type DriverApiData } from './Driver';
import { Pagination } from './Pagination';
import { Race, type RaceApiData } from './Race';
import { Circuit, type CircuitApiData } from './Circuit';

export interface ApiOptions {
    limit?: number;
    offset?: number;
}

export type Round = number | 'last' | 'next';
export type Season = number;
export type Status =
    | 'Finished'
    | 'Disqualified'
    | 'Accident'
    | 'Collision'
    | 'Engine'
    | 'Gearbox'
    | 'Transmission'
    | 'Clutch'
    | 'Hydraulics'
    | 'Electrical'
    | 'Spun off'
    | 'Radiator'
    | 'Suspension'
    | 'Brakes'
    | 'Differential'
    | 'Overheating'
    | 'Mechanical'
    | 'Tyre'
    | 'Driver Seat'
    | 'Puncture'
    | 'Driveshaft'
    | '+1 Lap'
    | '+2 Lap'
    | '+3 Lap'
    | '+4 Lap'
    | '+5 Lap'
    | '+6 Lap'
    | '+7 Lap'
    | '+8 Lap'
    | '+9 Lap';

export interface CircuitTable {
    CircuitTable: {
        Circuits: CircuitApiData[];
    };
}

export interface DriverTable {
    DriverTable: {
        Drivers: DriverApiData[];
    };
}

export interface RaceTable {
    RaceTable: {
        Races: RaceApiData[];
    };
}

export type Endpoints = {
    // Circuits
    '/circuits': {
        params: Record<string, never>;
        returns: CircuitTable;
    };
    '/{season}/circuits': {
        params: {
            season: Season;
        };
        returns: CircuitTable;
    };
    '/{season}/{round}/circuits': {
        params: {
            season: Season;
            round: Round;
        };
        returns: CircuitTable;
    };
    '/circuits/{id}': {
        params: {
            id: string;
        };
        returns: CircuitTable;
    };
    '/constructors/{id}/circuits': {
        params: {
            id: string;
        };
        returns: CircuitTable;
    };
    '/drivers/{id}/circuits': {
        params: {
            id: string;
        };
        returns: CircuitTable;
    };
    '/fastest/{lapRank}/circuits': {
        params: {
            lapRank: number;
        };
        returns: CircuitTable;
    };
    '/grid/{gridPosition}/circuits': {
        params: {
            gridPosition: number;
        };
        returns: CircuitTable;
    };
    '/results/{finishPosition}/circuits': {
        params: {
            finishPosition: number;
        };
        returns: CircuitTable;
    };

    // Drivers

    '/drivers': {
        params: Record<string, never>;
        returns: DriverTable;
    };
    '/drivers/{id}': {
        params: {
            id: string;
        };
        returns: DriverTable;
    };

    // Results

    '/drivers/{id}/results': {
        params: {
            id: string;
        };
        returns: RaceTable;
    };

    '/drivers/{id}/results/{position}': {
        params: {
            id: string;
            position: number;
        };
        returns: RaceTable;
    };
};

export class Endpoint<T extends keyof Endpoints> {
    public readonly baseUrl: string = 'https://api.jolpi.ca/ergast/f1';

    public readonly path: T;
    public readonly params: Endpoints[T]['params'];

    public constructor(path: T, params: Endpoints[T]['params']) {
        this.path = path;
        this.params = params;
    }

    public get url(): string {
        return this.getUrl(
            this.params
                ? this.path.replace(/\{([a-z]+)}/, (fullMatch: string, name: keyof Endpoints[T]['params']): string => {
                      return name in this.params ? `${this.params[name]}` : fullMatch;
                  })
                : this.path,
        );
    }

    private getUrl(path: string): string {
        return this.baseUrl + path + '.json';
    }
}

export class Jolpica {
    public static async request<T extends keyof Endpoints>(
        path: T,
        params: Endpoints[T]['params'],
        options?: ApiOptions,
    ): Promise<Response<Endpoints[T]['returns']>> {
        const endpoint = new Endpoint(path, params);
        const config: AxiosRequestConfig = {
            params: options,
        };
        const response = await axios.get<Response<Endpoints[T]['returns']>>(endpoint.url, config);
        return response.data;
    }

    // Circuits

    private static paginateCircuits(data: MRData<CircuitTable>): Pagination<Circuit> {
        return new Pagination(
            data,
            data.CircuitTable.Circuits.map((circuit) => new Circuit(circuit)),
        );
    }

    public static async getCircuits(options?: ApiOptions): Promise<Pagination<Circuit>> {
        const { MRData } = await this.request('/circuits', {}, options);

        return this.paginateCircuits(MRData);
    }

    public static async getSeasonCircuits(season: Season, options?: ApiOptions): Promise<Pagination<Circuit>> {
        const { MRData } = await this.request('/{season}/circuits', { season }, options);

        return this.paginateCircuits(MRData);
    }

    public static async getSeasonRoundCircuit(
        season: Season,
        round: Round,
        options?: ApiOptions,
    ): Promise<Circuit | null> {
        const { MRData } = await this.request('/{season}/{round}/circuits', { season, round }, options);

        return +MRData.total == 0 ? null : new Circuit(MRData.CircuitTable.Circuits[0]);
    }

    public static async getCircuit(id: string, options?: ApiOptions): Promise<Circuit | null> {
        const { MRData } = await this.request('/circuits/{id}', { id }, options);

        return +MRData.total == 0 ? null : new Circuit(MRData.CircuitTable.Circuits[0]);
    }

    // Drivers

    private static paginateDrivers(data: MRData<DriverTable>): Pagination<Driver> {
        return new Pagination(
            data,
            data.DriverTable.Drivers.map((driver) => new Driver(driver)),
        );
    }

    public static async getDrivers(options?: ApiOptions): Promise<Pagination<Driver>> {
        const { MRData } = await this.request('/drivers', {}, options);

        return this.paginateDrivers(MRData);
    }

    public static async getDriver(id: string, options?: ApiOptions): Promise<Driver | null> {
        const { MRData } = await this.request('/drivers/{id}', { id }, options);

        return +MRData.total == 0 ? null : new Driver(MRData.DriverTable.Drivers[0]);
    }

    public static async getRacesWithResultsForDriver(driver: Driver, options?: ApiOptions): Promise<Pagination<Race>> {
        const { MRData } = await this.request(`/drivers/{id}/results`, { id: driver.id }, options);

        return new Pagination(
            MRData,
            MRData.RaceTable.Races.map((race) => new Race(race)),
        );
    }
}
