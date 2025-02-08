import type { MRData, Response } from '@/types/jolpica';
import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';

import { Circuit, type CircuitApiData } from './Circuit';
import { Driver, type DriverApiData } from './Driver';
import { Pagination } from './Pagination';
import { Race, type RaceApiData } from './Race';
import type { DriverStandingApiData } from './DriverStanding';

export interface ApiOptions {
    limit?: number;
    offset?: number;
}

export type Round = number | 'last' | 'next';
export type Season = number | 'current';
export type StandingPositionText = string | 'E' | 'D' | '-';
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

export interface DriverStandingsTable {
    StandingsTable: {
        season: string;
        round: string;
        StandingsLists: {
            season: string;
            round: string;
            DriverStandings: DriverStandingApiData[];
        }[];
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

    '{season}/drivers': {
        params: {
            season: Season;
        };
        returns: DriverTable;
    };

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

    '{season}/drivers/{id}/results': {
        params: {
            season: Season;
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

    '/{season}/drivers/{id}/results/{position}': {
        params: {
            season: Season;
            id: string;
            position: number;
        };
        returns: RaceTable;
    };

    '/{season}/results': {
        params: {
            season: Season;
        };
        returns: RaceTable;
    };

    '/{season}/results/{position}': {
        params: {
            season: Season;
            position: number;
        };
        returns: RaceTable;
    };

    // Races

    '/{season}/{round}': {
        params: {
            season: Season;
            round: Round;
        };
        returns: RaceTable;
    };

    // DriverStandings

    '/{season}/driverstandings': {
        params: {
            season: Season;
        };
        returns: DriverStandingsTable;
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
                ? this.path.replace(/\{([a-z]+)}/g, (fullMatch: string, name: keyof Endpoints[T]['params']): string => {
                      return name in this.params ? `${this.params[name]}` : fullMatch;
                  })
                : this.path,
        );
    }

    private getUrl(path: string): string {
        return this.baseUrl + path + '.json';
    }
}

// TODO: URL Builder at some point would help
export class Jolpica {
    public static async request<T extends keyof Endpoints, R = Endpoints[T]['returns']>(
        path: T,
        params: Endpoints[T]['params'],
        options?: ApiOptions,
    ): Promise<Response<R>> {
        const endpoint = new Endpoint(path, params);
        const config: AxiosRequestConfig = {
            params: options,
        };

        const response = await axios.get<Response<R>>(endpoint.url, config);
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

    public static async getDrivers(filters?: { season?: Season }, options?: ApiOptions): Promise<Pagination<Driver>> {
        let path: keyof Endpoints = '/drivers';
        let params = {};

        if (filters) {
            if (filters.season) {
                path = ('/{season}' + path) as keyof Endpoints;
                params = { ...params, season: filters.season };
            }
        }

        const { MRData } = await this.request<keyof Endpoints, DriverTable>(path, params, options);

        return new Pagination(
            MRData,
            MRData.DriverTable.Drivers.map((driver) => new Driver(driver)),
        );
    }

    public static async getDriver(id: string, options?: ApiOptions): Promise<Driver | null> {
        const { MRData } = await this.request('/drivers/{id}', { id }, options);

        return +MRData.total == 0 ? null : new Driver(MRData.DriverTable.Drivers[0]);
    }

    public static async getDriverRaceResults<T extends keyof Endpoints>(
        driver: Driver,
        filters?: { season?: Season; position?: number },
        options?: ApiOptions,
    ): Promise<Pagination<Race>> {
        let path: T = '/drivers/{id}/results' as T;
        let params: Endpoints[T]['params'] = { id: driver.id };

        if (filters) {
            if (filters.season) {
                path = ('/{season}' + path) as T;
                params = { ...params, season: filters.season };
            }

            if (filters.position) {
                path = (path + '/{position}') as T;
                params = { ...params, position: filters.position };
            }
        }

        const { MRData } = await this.request<T, RaceTable>(path, params, options);

        return new Pagination(
            MRData,
            MRData.RaceTable.Races.map((race) => new Race(race)),
        );
    }

    // Races

    public static async getSeasonRound(season: Season, round: Round, options?: ApiOptions): Promise<Race | null> {
        const { MRData } = await this.request('/{season}/{round}', { season, round }, options);

        return +MRData.total == 0 ? null : new Race(MRData.RaceTable.Races[0]);
    }
}
