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

    public random(): T {
        return this[Math.floor(Math.random() * this.length)];
    }
}

export function collect<T>(data: Iterable<T> = []): Collection<T> {
    return new Collection(...data);
}

export function range(start: number, stop: number, step: number = 1): Collection<number> {
    return collect(Array.from({ length: (stop - start) / step }, (_, index) => start + index * step));
}
