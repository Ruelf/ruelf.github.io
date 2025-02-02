export interface LocationApiData {
    lat: string;
    long: string;
    locality: string;
    country: string;
}

export class Location {
    lat: number;
    long: number;
    locality: string;
    country: string;

    public constructor(data: LocationApiData) {
        this.lat = +data.lat;
        this.long = +data.long;
        this.locality = data.locality;
        this.country = data.country;
    }
}
