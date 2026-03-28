import { apiClient } from './client';
import type { ApiRegistrationResponse, RegistrationResponse } from './types';


export class ApiUserService {

    // получить общую инфу о пользователе по JWT
    async registation({ username }: { username: string }): Promise<RegistrationResponse> {
        try {
            // либо себя получить, либо другого
            const endpoint = `/registation`
            const response = await apiClient.post<ApiRegistrationResponse>(endpoint, {username: username});
            return {
                success: true,
                result: response
            };

        } catch (error: any) {
            console.error('Error:', error);
            return {
                success: false,
                error: {
                    message: error.message || 'Ошибка авторизации',
                    status: error.status || 500,
                    errors: error.errors
                }
            };
        }
    }

}

export const apiUserService = new ApiUserService();
