export interface MRData {
    xmlns: string;
    series: string;
    url: string;
    limit: string;
    offset: string,
    total: string;
}

export interface Driver {
    driverId: string;
    url: string;
    givenName: string;
    familyName: string;
    dateOfBirth: string;
    nationality: string;
}

export interface DriverTable {
    DriverTable: {
        Drivers: Driver[];
    };
}

export interface Response<T> {
    MRData: MRData & T;
};
