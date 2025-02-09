export interface SeasonApiData {
    season: string;
    url: string;
}

export class Season {
    year: number;
    url: string;

    public constructor(data: SeasonApiData) {
        this.year = Number(data.season);
        this.url = data.url;
    }
}
