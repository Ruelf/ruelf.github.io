import type { Response } from '@/types/jolpica';
import type {
    CircuitTable,
    DriverStandingsTable,
    DriverTable,
    RaceTable,
    SeasonParam,
    SeasonTable,
} from './Jolpica';
import axios from 'axios';

export type UrlParams = Partial<{
    season: SeasonParam;
    drivers: boolean;
}>;

interface TableMap {
    DriverTable: DriverTable;
    CircuitTable: CircuitTable;
    RaceTable: RaceTable;
    DriverStandingsTable: DriverStandingsTable;
    SeasonTable: SeasonTable;
}

export class UrlBuilder<R extends keyof TableMap = 'RaceTable'> {
    private readonly params: UrlParams;
    private readonly dataKey: R;

    public constructor(params?: UrlParams, dataKey?: R) {
        this.params = params ?? {};
        // @ts-expect-error shut up ts
        this.dataKey = dataKey ?? 'RaceTable';
    }

    public season(season: SeasonParam): UrlBuilder<R> {
        return this.extend({ season });
    }

    public drivers(): UrlBuilder<'DriverTable'> {
        return this.extend({ drivers: true }, 'DriverTable');
    }

    public async get(): Promise<Response<TableMap[R]>> {
        const { data } = await axios.request<Response<TableMap[R]>>({
            method: 'GET',
            baseURL: 'https://api.jolpi.ca/ergast/f1',
            url: this.buildUrl(),
        });

        // @ts-expect-error shut up ts
        return data.MRData[this.dataKey];
    }

    private buildUrl(): string {
        let url = '';

        if (this.params.season) {
            url += '/{season}';
        }

        if (this.params.drivers) {
            url += '/drivers';
        }

        url += '.json';

        return url.replace(
            /\{([a-z]+)}/g,
            (fullMatch, name: keyof UrlParams): string => {
                return name in this.params ? `${this.params[name]}` : fullMatch;
            },
        );
    }

    private extend<T extends keyof TableMap>(
        params: UrlParams,
        dataKey?: T,
    ): UrlBuilder<T> {
        // @ts-expect-error shut up ts
        return new UrlBuilder<T>(
            { ...this.params, ...params },
            dataKey ?? this.dataKey,
        );
    }
}
