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
export type AllowedIndexMap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7| 8;

export interface Match {
    id: string;
    player_1: Player;
    player_2: Player;
    current_player_move: 1 | 2;
    map: AllowedCharsMap[];
    winner: 1 | 2 | null;
}

export interface MatchResponse {
    success: boolean;
    result?: Match;
    error?: {
        message: string;
        status: number;
        errors?: any;
    };
}

export interface UpdateMatch {
    current_player: Player;
    index_cell: AllowedIndexMap;
}

// ошибки api
export interface ApiError {
    message: string;
    status: number;
    errors?: { [key: string]: string[] };
}