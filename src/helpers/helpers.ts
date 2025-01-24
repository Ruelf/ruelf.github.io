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
