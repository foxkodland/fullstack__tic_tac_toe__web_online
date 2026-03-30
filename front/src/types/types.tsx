export type AllowedCharsMap = "" | "X" | "O";
export type AllowedIndexMap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7| 8;


export interface Player {
    username: string;
    id: string;
}

export interface Match {
    id: string;
    player_1: Player;
    player_2: Player;
    current_player_move: 1 | 2;
    map: AllowedCharsMap[];
    winner: 1 | 2 | "draw" | null;
}

export interface findWinnerScheme {
    index: number;
    direction: "horizontal" | "vertical" | "diagonal-top" | "diagonal-bottom";
}