<h1 style="text-align:center">Test</h1>

```typescript
export default class Collection {
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
}
```
