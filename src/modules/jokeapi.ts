import axios from 'axios';

export type ResponseFormat = 'json' | 'xml' | 'yaml' | 'txt';

export type JokeCategory =
    | 'Programming'
    | 'Miscellaneous'
    | 'Dark'
    | 'Pun'
    | 'Spooky'
    | 'Christmas';

export enum JokeLanguage {
    Czech = 'cs',
    German = 'de',
    English = 'en',
    Spanish = 'es',
    French = 'fr',
    Portuguese = 'pt',
}

export type JokeBlacklistFlag =
    | 'nsfw'
    | 'religious'
    | 'political'
    | 'racist'
    | 'sexist'
    | 'explicit';

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

export type SingleJokeResponse = SuccessResponse &
    (SingleTypeJoke | TwopartTypeJoke);

export type MultipleJokesResponse = SuccessResponse & {
    amount: number;
    jokes: (SingleTypeJoke | TwopartTypeJoke)[];
};

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
        totalCount: number;
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
    timestamp: number;
};

/**
 * A class to interact with the JokeAPI.
 * Provides methods to fetch jokes and information about the JokeAPI.
 *
 * @example
 * // Fetch a single joke
 * const joke = await JokeApi.joke({ jokeType: 'single' });
 * console.log(joke);
 *
 * @example
 * // Fetch information about the JokeAPI
 * const info = await JokeApi.info();
 * console.log(info);
 */
export default class JokeApi {
    private static readonly baseUrl: string = 'https://v2.jokeapi.dev';

    private static async request(
        path: '/info',
        params?: never,
    ): Promise<InfoResponse>;
    private static async request(
        path: `/joke/${string}`,
        params?: Record<string, unknown>,
    ): Promise<SingleJokeResponse | MultipleJokesResponse>;

    private static async request<T extends SuccessResponse>(
        path: string,
        params?: Record<string, unknown>,
    ): Promise<T> {
        const { data } = await axios.get<T | ErrorResponse>(path, {
            baseURL: this.baseUrl,
            params,
        });

        if (data.error) {
            throw new JokeApiError(data.message);
        }

        return data;
    }

    public static async joke(
        options: JokeOptions & { jokeType: 'single'; amount?: 1 },
    ): Promise<SingleTypeJoke>;
    public static async joke(
        options: JokeOptions & { jokeType: 'twopart'; amount?: 1 },
    ): Promise<TwopartTypeJoke>;
    public static async joke(
        options?: JokeOptions & { amount?: 1 },
    ): Promise<SingleTypeJoke | TwopartTypeJoke>;

    public static async joke(
        options: JokeOptions & { jokeType: 'single' },
    ): Promise<SingleTypeJoke[]>;
    public static async joke(
        options: JokeOptions & { jokeType: 'twopart' },
    ): Promise<TwopartTypeJoke[]>;
    public static async joke(
        options?: JokeOptions,
    ): Promise<(SingleTypeJoke | TwopartTypeJoke)[]>;

    public static async joke(
        options?: JokeOptions,
    ): Promise<
        SingleTypeJoke | TwopartTypeJoke | (SingleTypeJoke | TwopartTypeJoke)[]
    > {
        const category = options?.categories?.join(',') ?? 'Any';

        const data = await this.request(`/joke/${category}`, {
            'lang': options?.language,
            'blacklistFlags': options?.blacklistFlags?.join(','),
            'type': options?.jokeType,
            'contains': options?.search,
            'idRange': options?.idRange?.join('-'),
            'safe-mode': options?.safeMode ? true : undefined,
            'amount': options?.amount,
        });

        return 'jokes' in data ? data.jokes : data;
    }

    /**
     * This endpoint provides a lot of information about JokeAPI and its jokes:
     * - The version number
     * - The amount of jokes
     * - All the available categories, flags, types and formats
     * - A 13-character UNIX timestamp
     * - The URL to a joke submission form
     * - A list of languages (code and name) JokeAPI currently supports
     * - The minimum and maximum values of an ID range per each language
     * - The amount of safe jokes there are per language
     * - A string with some information, like a message of the day
     * @returns {Promise<InfoResponse>} The response object
     */
    public static info(): Promise<InfoResponse> {
        return this.request('/info');
    }
}
