import type { AllowedIndexMap, Match, Player } from "../types/types";

export interface UpdateMatch {
    current_player: Player;
    index_cell: AllowedIndexMap;
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

export interface MatchResponse {
    success: boolean;
    result?: Match;
    error?: {
        message: string;
        status: number;
        errors?: any;
    };
}

// ошибки api
export interface ApiError {
    message: string;
    status: number;
    errors?: { [key: string]: string[] };
}