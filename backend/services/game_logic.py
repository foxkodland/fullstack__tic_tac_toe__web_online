from typing import Literal


def find_winner(map: list[Literal["", "X", "O"]]) -> Literal["X", "O"] | None:
    """найти победителя в крестики нолики
        Поле: 
            0 1 2
            3 4 5
            6 7 8
    """
    # горизонтали
    for i in (0, 3, 6):
        if map[i] and map[i] == map[i + 1] == map[i + 2]:
            return map[i]
    # вертикали
    for i in (0, 1, 2):
        if map[i] and map[i] == map[i + 3] == map[i + 6]:
            return map[i]
    # диагонали
    if map[0] and map[0] == map[4] == map[8]:
        return map[0]
    if map[2] and map[2] == map[4] == map[6]:
        return map[2]
    return None
