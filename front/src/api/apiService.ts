import { apiClient } from './client';
import type { CreateMatchResponse, Match, Player, PlayersResponse, RegistrationResponse } from './types';


export class ApiService {

    // регистрация
    async registation({ username }: { username: string }): Promise<RegistrationResponse> {
        try {
            const endpoint = `/registation`
            const response = await apiClient.post<Player>(endpoint, {username: username});
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

    // получить всех доступных игроков
    async getPlayers(): Promise<PlayersResponse> {
        try {
            const endpoint = `/players`
            const response = await apiClient.get<Player[]>(endpoint);
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

    // создать матч между 2 игроками
    async createMatch(currentPlayer: Player, enemyPlayer: Player): Promise<CreateMatchResponse> {
        try {
            const endpoint = `/match`
            const response = await apiClient.post<Match>(endpoint, {current_player: currentPlayer, enemy_player: enemyPlayer});
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

    // получить 1 матч
    async getMatch(matchId: string): Promise<CreateMatchResponse> {
        try {
            const endpoint = `/match/${matchId}`
            const response = await apiClient.get<Match>(endpoint);
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

export const apiService = new ApiService();
