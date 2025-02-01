import { Location, type LocationApiData } from './Location'

export interface CircuitApiData {
    circuitId: string
    url: string
    circuitName: string
    Location: LocationApiData
}

export class Circuit {
    id: string
    url: string
    name: string
    location: Location

    public constructor(data: CircuitApiData) {
        this.id = data.circuitId
        this.url = data.url
        this.name = data.circuitName
        this.location = new Location(data.Location)
    }
}
