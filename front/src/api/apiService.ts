import { apiClient } from './client';
import type { MatchResponse, Match, Player, PlayersResponse, RegistrationResponse, UpdateMatch } from './types';


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
    async createMatch(currentPlayer: Player, enemyPlayer: Player): Promise<MatchResponse> {
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
    async getMatch(matchId: string): Promise<MatchResponse> {
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

    // сделать ход
    async makeMove(matchId: string, data: UpdateMatch): Promise<MatchResponse> {
        try {
            const endpoint = `/match/${matchId}`
            const response = await apiClient.patch<Match>(endpoint, {...data});
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

    // удалить игрока (себя) из очереди
    async deletePlayer(currentPlayer: Player): Promise<PlayersResponse> {
        try {
            const endpoint = `/players`
            const response = await apiClient.delete<Player[]>(endpoint, {...currentPlayer});
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

    // найти матч по игроку
    async findMatch(currentPlayer: Player): Promise<MatchResponse> {
        try {
            const endpoint = `/match/?username=${currentPlayer.username}&id=${currentPlayer.id}`
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
