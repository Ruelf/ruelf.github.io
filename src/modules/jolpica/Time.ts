export interface TimeApiData {
    millis: string;
    time: string;
}

export class Time {
    millis: number;
    time: string;

    public constructor(data: TimeApiData) {
        this.millis = Number(data.millis);
        this.time = data.time;
    }
}
