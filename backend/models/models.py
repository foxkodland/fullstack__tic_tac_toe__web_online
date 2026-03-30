import uuid
from typing import Literal

from pydantic import BaseModel


class Registation(BaseModel):
    username: str


class Player(BaseModel):
    username: str
    id: uuid.UUID


class CreateMatch(BaseModel):
    current_player: Player
    enemy_player: Player


class Match(BaseModel):
    id: uuid.UUID
    player_1: Player
    player_2: Player
    current_player_move: Literal[1, 2]  # чья очередь ходить
    map: list[Literal["", "X", "O"]]  # поле - это список из 9 элементов
    winner: Literal[1, 2, "draw"] | None = None


class UpdateMatch(BaseModel):
    current_player: Player
    index_cell: Literal[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
