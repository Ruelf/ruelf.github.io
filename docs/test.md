```typescript
/**
 * A generic collection class that extends the native Array class with additional utility methods.
 *
 * @template T - The type of elements in the collection.
 */
export class Collection<T> extends Array<T> {
  /**
   * Creates an instance of the collection with the provided items.
   *
   * @param items - An array of items of type T to initialize the collection.
   */
  public constructor(items: T[]) {
    super(...items);
  }
  /**
   * Creates a new Collection instance from an array of data.
   *
   * @template T - The type of elements in the collection.
   * @param data - The array of data to be converted into a Collection.
   * @returns A new Collection instance containing the provided data.
   */
  public static make<T>(data: T[]): Collection<T> {
    return new this(data);
  }

  /**
   * Inserts an item at the specified index in the collection.
   *
   * @param index - The position at which to insert the item.
   * @param item - The item to be inserted into the collection.
   */
  public insertAt(index: number, item: T): void {
    this.splice(index, 0, item);
  }

  /**
   * Removes an element from the collection at the specified index.
   *
   * @param index - The zero-based index of the element to remove.
   * @returns The removed element if the index is valid, otherwise `undefined`.
   */
  public removeAt(index: number): T | undefined {
    const [deleted] = this.splice(index, 1);

    return deleted;
  }

  /**
   * Removes the specified item from the collection.
   *
   * @param item - The item to be removed from the collection.
   */
  public remove(item: T): void {
    this.removeAt(this.indexOf(item));
  }

  /**
   * Filters the collection based on a specified key-value pair.
   *
   * @template K - The type of the key in the collection items.
   * @param key - The key to filter the collection by.
   * @param value - The value to match against the specified key.
   * @returns A new collection containing items that match the key-value pair.
   */
  public where<K extends keyof T>(key: K, value: T[K]): Collection<T> {
    return collect(this.filter((item) => item[key] === value));
  }

  /**
   * Filters the collection by checking if the specified key's value is within the provided array of values.
   *
   * @template K - The key of the items in the collection.
   * @param key - The key to check the values against.
   * @param values - An array of values to match against the specified key.
   * @returns A new collection containing items where the specified key's value is in the provided array of values.
   */
  public whereIn<K extends keyof T>(key: K, values: T[K][]): Collection<T> {
    return collect(this.filter((item) => values.includes(item[key])));
  }

  /**
   * Extracts a specific property from each item in the collection and returns a new collection of those properties.
   *
   * @template K - The key of the property to pluck from each item.
   * @param key - The key of the property to extract from each item in the collection.
   * @returns A new collection containing the values of the specified property from each item.
   */
  public pluck<K extends keyof T>(key: K): Collection<T[K]> {
    return collect(this.map((item) => item[key]));
  }

  /**
   * Groups the elements of the collection based on the provided callback function.
   *
   * @template K - The type of the key returned by the callback function.
   * @param callback - A function that takes an element of the collection and returns a key to group by.
   * @returns A map where the keys are the values returned by the callback function and the values are collections of elements that correspond to those keys.
   */
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

  /**
   * Returns a random element from the collection.
   *
   * @returns A randomly selected element from the collection.
   */
  public random(): T {
    return this[Math.floor(Math.random() * this.length)];
  }
}

/**
 * Creates a new Collection instance from the provided data array.
 *
 * @template T - The type of elements in the collection.
 * @param [data=[]] - An optional array of data to initialize the collection with. Defaults to an empty array.
 * @returns A new Collection instance containing the provided data.
 */
export function collect<T>(data: T[] = []): Collection<T> {
  return Collection.make(data);
}

/**
 * Generates a collection of numbers within a specified range.
 *
 * @param start - The starting number of the range.
 * @param stop - The ending number of the range (exclusive).
 * @param step - The increment between each number in the range. Defaults to 1.
 * @returns A collection of numbers from start to stop, incremented by step.
 */
export function range(start: number, stop: number, step: number = 1): Collection<number> {
  return collect(Array.from({ length: (stop - start) / step }, (_, index) => start + index * step));
}
```
