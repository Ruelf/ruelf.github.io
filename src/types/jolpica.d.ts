import type { CircuitApiData } from '@/jolpica/Circuit';
import type { DriverApiData } from '@/jolpica/Driver';
import type { RaceApiData } from '@/jolpica/Race';

export type MRData<T = object> = T & {
    xmlns: '';
    series: 'f1';
    url: string;
    limit: string;
    offset: string;
    total: string;
};

export interface Response<T> {
    MRData: MRData<T>;
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
export interface CircuitTable {
    CircuitTable: {
        Circuits: CircuitApiData[];
    };
}

export namespace Api {}

// export interface Race {}
