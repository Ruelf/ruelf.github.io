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

    public groupBy<K>(callback: (item: T) => K): Map<K, Collection<T>> {
        return this.reduce((previous, current) => {
            const key = callback(current);

            if (!previous.has(key)) {
                previous.set(key, collect());
            }

            previous.get(key)?.push(current);

            return previous;
        }, new Map<K, Collection<T>>());
    }

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

    public chunk(size: number): Collection<Collection<T>> {
        const chunks = collect<Collection<T>>();

        for (let i = 0; i < this.length; i += size) {
            chunks.push(collect(this.slice(i, i + size)));
        }
        return chunks;
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
