import { Jolpica, type ApiOptions } from './Jolpica'
import type { Pagination } from './Pagination'
import type { Race } from './Race'

export interface DriverApiData {
    driverId: string
    url: string
    givenName: string
    familyName: string
    dateOfBirth: string
    nationality: string
}

export class Driver {
    id: string
    url: string
    givenName: string
    familyName: string
    dateOfBirth: Date
    nationality: string

    public constructor(data: DriverApiData) {
        this.id = data.driverId
        this.url = data.url
        this.givenName = data.givenName
        this.familyName = data.familyName
        this.dateOfBirth = new Date(data.dateOfBirth)
        this.nationality = data.nationality
    }

    public getRacesWithResults(options?: ApiOptions): Promise<Pagination<Race>> {
        return Jolpica.getRacesWithResultsForDriver(this, options)
    }
}
