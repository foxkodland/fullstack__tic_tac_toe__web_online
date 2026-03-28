import { API_BASE_URL } from "../config";
import type { ApiError } from "./types";


export class ApiClient {
    private baseUrl: string;

    constructor(baseUrl: string = API_BASE_URL) {
        this.baseUrl = baseUrl;
    }

    async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {

        const url = `${this.baseUrl}${endpoint}`;

        const headers = { ...options.headers, 'Content-Type': "application/json"} as { [key: string]: string };
 
        const config: RequestInit = {
            headers,
            ...options,
        };

        // Добавить токен если есть
        // const token = localStorage.getItem('access_token');
        // if (token) {
        //     config.headers = {
        //         ...config.headers,
        //         'Authorization': `Bearer ${token}`,
        //     };
        // }

        try {
            const response = await fetch(url, config);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw {
                    message: errorData.detail || 'Ошибка сервера',
                    status: response.status,
                    errors: errorData.errors
                } as ApiError;
            }

            return await response.json();
        } catch (error) {
            if (error instanceof TypeError) {
                throw {
                    message: 'Ошибка сети. Проверьте подключение',
                    status: 0
                } as ApiError;
            }
            throw error;
        }
    }

    async post<T>(endpoint: string, data: any): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    // переделанный немного метод для отправки формы, убран json
    async put<T>(endpoint: string, data: any): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'PUT',
            body: data
        });
    }

    async get<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'GET',
        });
    }

    async patch<T>(endpoint: string, data: any): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'PATCH',
            body: JSON.stringify(data),
        });
    }

    async delete<T>(endpoint: string, data?: any): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'DELETE',
            body: JSON.stringify(data),
        });
    }
}

export const apiClient = new ApiClient();
