import { Constructor, type ConstructorApiData } from './Constructor'
import { Driver, type DriverApiData } from './Driver'
import { Time, type TimeApiData } from './Time'

export interface ResultApiData {
    number: string
    position: string
    positionText: string
    points: number
    Driver: DriverApiData
    Constructor: ConstructorApiData
    grid: string
    laps: string
    status: string

    Time?: TimeApiData
}

export class Result {
    number: number
    position: number
    positionText: string
    points: number
    Driver: Driver
    Constructor: Constructor
    grid: number
    laps: number
    status: string
    time?: Time

    public constructor(data: ResultApiData) {
        this.number = +data.number
        this.position = +data.position
        this.positionText = data.positionText
        this.points = data.points
        this.Driver = new Driver(data.Driver)
        this.Constructor = new Constructor(data.Constructor)
        this.grid = +data.grid
        this.laps = +data.laps
        this.status = data.status

        if (data.Time) {
            this.time = new Time(data.Time)
        }
    }
}
