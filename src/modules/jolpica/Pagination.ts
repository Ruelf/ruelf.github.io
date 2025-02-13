import type { MRData } from '@/types/jolpica';
import { collect, type Collection } from '@/utils';

export class Pagination<T = unknown> {
    limit: number;
    offset: number;
    total: number;
    data: Collection<T>;

    public constructor(MRData: MRData, data: Iterable<T>) {
        this.limit = Number(MRData.limit);
        this.offset = Number(MRData.offset);
        this.total = Number(MRData.total);

        this.data = collect(data);
    }

    public get currentPage(): number {
        return this.offset / this.limit + 1;
    }

    public get totalPages(): number {
        return Math.ceil(this.total / this.limit);
    }

    public get from(): number {
        return this.offset + 1;
    }

    public get to(): number {
        return this.offset + this.limit;
    }
}
