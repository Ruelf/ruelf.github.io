export type MRData<T> = T & {
    xmlns: string;
    series: string;
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
        Drivers: Driver[];
    };
}
export interface RaceTable {
    RaceTable: {
        Races: Race[];
    };
}

// export interface Race {}
