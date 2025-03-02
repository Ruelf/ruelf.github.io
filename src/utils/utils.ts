import type { Response } from '@/types/jolpica';
import type { Json } from '@/types/utility';
import axios, { type AxiosRequestConfig } from 'axios';

export async function makeJolpicaRequest<T extends Json>(
    path: string,
    config?: AxiosRequestConfig,
): Promise<Response<T>> {
    const response = await axios.get<Response<T>>(
        'https://api.jolpi.ca/ergast/f1' + path + '.json',
        config,
    );
    return response.data;
}

// Decorator I'll never use
export function debounce<A, R>(
    ms: number,
): (callback: (...args: A[]) => R) => (...args: A[]) => void {
    return function (callback: (...args: A[]) => R): (...args: A[]) => void {
        let timeout: number;

        return function (...args: A[]): void {
            if (timeout) {
                clearTimeout(timeout);
            }

            timeout = setTimeout(() => {
                callback(...args);
            }, ms);
        };
    };
}

export function sleep(timeout: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, timeout);
    });
}
