import { Circuit, type CircuitApiData } from './Circuit'
import { Result, type ResultApiData } from './Result'

export interface RaceApiData {
    season: string
    round: string
    url: string
    raceName: string
    Circuit: CircuitApiData
    date: string

    Results?: ResultApiData[]
}

export class Race {
    season: number
    round: number
    url: string
    name: string
    circuit: Circuit
    date: Date
    results?: Result[]

    public constructor(data: RaceApiData) {
        this.season = +data.season
        this.round = +data.round
        this.url = data.url
        this.name = data.raceName
        this.circuit = new Circuit(data.Circuit)
        this.date = new Date(data.date)

        if (data.Results) {
            this.results = data.Results.map((result) => new Result(result))
        }
    }
}
