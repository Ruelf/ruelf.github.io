export interface ConstructorApiData {
    constructorId: string
    url: string
    name: string
    nationality: string
}

export class Constructor {
    id: string
    url: string
    name: string
    nationality: string

    public constructor(data: ConstructorApiData) {
        this.id = data.constructorId
        this.url = data.url
        this.name = data.name
        this.nationality = data.nationality
    }
}
