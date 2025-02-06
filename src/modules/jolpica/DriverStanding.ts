import { Constructor, type ConstructorApiData } from './Constructor';
import { Driver, type DriverApiData } from './Driver';
import type { StandingPositionText } from './Jolpica';

export interface DriverStandingApiData {
    position: string;
    positionText: string;
    points: string;
    wins: string;
    Driver: DriverApiData;
    Constructors: ConstructorApiData[];
}

export class DriverStanding {
    position: number;
    positionText: StandingPositionText;
    points: number;
    wins: number;
    Driver: Driver;
    Constructors: Constructor[];

    public constructor(data: DriverStandingApiData) {
        this.position = Number(data.position);
        this.positionText = data.positionText;
        this.points = Number(data.points);
        this.wins = Number(data.wins);
        this.Driver = new Driver(data.Driver);
        this.Constructors = data.Constructors.map((constructorData) => new Constructor(constructorData));
    }
}
