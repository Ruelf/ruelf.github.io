import axios from 'axios';

export type ResponseFormat = 'json' | 'xml' | 'yaml' | 'txt';

export type JokeCategory = 'Programming' | 'Miscellaneous' | 'Dark' | 'Pun' | 'Spooky' | 'Christmas';

export enum JokeLanguage {
    Czech = 'cs',
    German = 'de',
    English = 'en',
    Spanish = 'es',
    French = 'fr',
    Portuguese = 'pt',
}

export type JokeBlacklistFlag = 'nsfw' | 'religious' | 'political' | 'racist' | 'sexist' | 'explicit';

export type JokeType = 'single' | 'twopart';

export interface ErrorResponse {
    error: true;
    internalError: boolean;
    code: number;
    message: string;
    causedBy: string[];
    additionalInfo: string;
    timestamp: number;
}

export interface SuccessResponse {
    error: false;
}

export interface Joke {
    category: JokeCategory;
    flags: Record<JokeBlacklistFlag, boolean>;
    id: number;
    safe: boolean;
    lang: JokeLanguage;
}

export interface SingleTypeJoke extends Joke {
    type: 'single';
    joke: string;
}

export interface TwopartTypeJoke extends Joke {
    type: 'twopart';
    setup: string;
    delivery: string;
}

export type JokeResponse = SuccessResponse & (SingleTypeJoke | TwopartTypeJoke);

export interface JokeOptions {
    categories?: JokeCategory[];
    language?: JokeLanguage;
    blacklistFlags?: JokeBlacklistFlag[];
    jokeType?: JokeType;
    search?: string;
    idRange?: [number, number];
    safeMode?: boolean;
    amount?: number;
}

export class JokeApiError extends Error {
    // TODO: Add more properties
    // public readonly code: number;
    // public constructor(message: string, code: number) {
    //     super(message);
    //     this.code = code;
    // }
}

export type InfoResponse = SuccessResponse & {
    version: string;
    jokes: {
        categories: JokeCategory[];
        flags: JokeBlacklistFlag[];
        types: JokeType[];
        submissionUrl: string;
        idRange: Record<JokeLanguage, [number, number]>;
        safeJokes: {
            lang: JokeLanguage;
            count: number;
        }[];
    };
    formats: ResponseFormat[];
    jokeLanguages: number;
    systemLanguages: number;
    info: string;
    timestam: number;
};

export default class JokeApi {
    private static readonly baseUrl: string = 'https://v2.jokeapi.dev';

    private static async request(path: '/info', params?: never): Promise<InfoResponse>;
    private static async request(path: `/joke/${string}`, params?: Record<string, unknown>): Promise<JokeResponse>;
    private static async request<T extends SuccessResponse>(
        path: string,
        params?: Record<string, unknown>,
    ): Promise<T> {
        const { data } = await axios.get<T | ErrorResponse>(path, { baseURL: this.baseUrl, params });

        if (data.error) {
            throw new JokeApiError(data.message);
        }

        return data;
    }

    public static joke(options: JokeOptions & { jokeType: 'single' }): Promise<SingleTypeJoke>;
    public static joke(options: JokeOptions & { jokeType: 'twopart' }): Promise<TwopartTypeJoke>;
    public static joke(options?: JokeOptions & { amount?: 1 }): Promise<SingleTypeJoke | TwopartTypeJoke>;

    // TODO
    // public static joke(options: JokeOptions & { jokeType: 'single' }): Promise<SingleTypeJoke[]>;
    // public static joke(options: JokeOptions & { jokeType: 'twopart' }): Promise<TwopartTypeJoke[]>;
    // public static joke(options?: JokeOptions): Promise<(SingleTypeJoke | TwopartTypeJoke)[]>;
    // Return type will be: Promise<SingleTypeJoke[] | TwopartTypeJoke[] | (SingleTypeJoke | TwopartTypeJoke)[] | (SingleTypeJoke | TwopartTypeJoke)>

    public static joke(options?: JokeOptions): Promise<SingleTypeJoke | TwopartTypeJoke> {
        const category = options?.categories?.join(',') ?? 'Any';

        return this.request(`/joke/${category}`, {
            lang: options?.language,
            blacklistFlags: options?.blacklistFlags?.join(','),
            type: options?.jokeType,
            contains: options?.search,
            idRange: options?.idRange?.join('-'),
            'safe-mode': options?.safeMode ? true : undefined,
            amount: 1,
        });
    }

    public static info(): Promise<InfoResponse> {
        return this.request('/info');
    }
}
