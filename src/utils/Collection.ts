import type { Json } from '@/types/utility';

export class Collection<T> extends Array<T> {
    public insertAt(index: number, item: T): void {
        this.splice(index, 0, item);
    }

    public removeAt(index: number): T | undefined {
        const [deleted] = this.splice(index, 1);

        return deleted;
    }

    public remove(item: T): void {
        this.removeAt(this.indexOf(item));
    }

    public where<K extends keyof T>(key: K, value: T[K]): Collection<T> {
        return collect(this.filter((item) => item[key] === value));
    }

    public whereIn<K extends keyof T>(key: K, values: T[K][]): Collection<T> {
        return collect(this.filter((item) => values.includes(item[key])));
    }

    // public pluck<K extends keyof T, V extends keyof T>(
    //     key: K,
    //     value: K,
    // ): Map<T[K], T[V]>;
    public pluck<K extends keyof T>(key: K): Collection<T[K]> {
        return collect(this.map((item) => item[key]));
    }

    public groupBy<K>(callback: (item: T) => K): Map<K, Collection<T>> {
        return this.reduce<Map<K, Collection<T>>>((previous, current) => {
            const key = callback(current);

            if (!previous.has(key)) {
                previous.set(key, collect());
            }

            previous.get(key)?.push(current);

            return previous;
        }, new Map());
    }

    // public zip<O>(other: O[]): Collection<[T, O]> {
    //     //
    // }

    public random(): T;
    public random(count: number): Collection<T>;
    public random(count?: number): T | Collection<T> {
        if (count === undefined) {
            return this[Math.floor(Math.random() * this.length)];
        } else {
            const copy = collect(this);
            const values = collect<T>();

            for (
                let i = 0;
                i < Math.max(0, Math.min(this.length, count));
                i++
            ) {
                const item = copy.random();
                copy.remove(item);
                values.push(item);
            }

            return values;
        }
    }

    public pipe<R>(callback: (collection: this) => R): R {
        return callback(this);
    }

    public shuffle(): Collection<T> {
        return this.random(this.length);
    }

    public min(this: Collection<number>): number {
        return Math.min(...this);
    }

    public max(this: Collection<number>): number {
        return Math.max(...this);
    }

    public jsonCopy(this: Collection<Json>): Collection<Json> {
        return JSON.parse(JSON.stringify(this));
    }
}

export function collect<T>(data: Iterable<T> = []): Collection<T> {
    return new Collection(...data);
}

export function range(
    start: number,
    stop: number,
    step: number = 1,
): Collection<number> {
    return collect(
        Array.from(
            { length: (stop - start) / step },
            (_, index) => start + index * step,
        ),
    );
}
