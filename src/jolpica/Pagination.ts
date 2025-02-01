import type { MRData } from '@/types/jolpica'

export class Pagination<TData = unknown> {
    limit: number
    offset: number
    total: number
    data: TData[]

    public constructor(MRData: MRData, data: TData[]) {
        this.limit = +MRData.limit
        this.offset = +MRData.offset
        this.total = +MRData.total

        this.data = data
    }

    public get currentPage(): number {
        return this.offset / this.limit + 1
    }

    public get totalPages(): number {
        return Math.ceil(this.total / this.limit)
    }

    public get from(): number {
        return this.offset + 1
    }

    public get to(): number {
        return this.offset + this.limit
    }
}
