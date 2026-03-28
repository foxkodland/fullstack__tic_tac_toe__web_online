// авторизация
export interface Player {
    username: string;
    id: string;
}

export interface RegistrationResponse {
    success: boolean;
    result?: Player;
    error?: {
        message: string;
        status: number;
        errors?: any;
    };
}

export interface PlayersResponse {
    success: boolean;
    result?: Player[];
    error?: {
        message: string;
        status: number;
        errors?: any;
    };
}

type AllowedCharsMap = "" | "X" | "O";

export interface Match {
    id: string;
    player_1: Player;
    player_2: Player;
    current_player_move: 1 | 2;
    map: AllowedCharsMap[]
}

export interface CreateMatchResponse {
    success: boolean;
    result?: Match;
    error?: {
        message: string;
        status: number;
        errors?: any;
    };
}