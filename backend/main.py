import uuid
import time

from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware

from models.models import CreateMatch, Player, Registation, Match, UpdateMatch
from services.game_logic import find_winner


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],         # List of allowed origins
    allow_credentials=True,        # Allow cookies to be sent with requests
    allow_methods=["*"],           # Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],           # Allow all HTTP headers
)

players: list[Player] = []
matches: dict[uuid.UUID, Match] = {}
empty_map = [""] * 9


def delete_match_from_stack(match_id: uuid.UUID):
    time.sleep(5)
    del matches[match_id]


@app.get("/players")
async def players_route() -> list[Player]:
    return players


@app.delete("/players")
async def delete_player_route(player: Player) -> list[Player]:
    if player in players:
        players.remove(player)
    return players


# регистрация игрока
@app.post("/players")
async def registation_route(data: Registation) -> Player:
    new_player = Player(id=uuid.uuid4(), username=data.username)
    players.append(new_player)
    return new_player


# создать матч
@app.post("/matches")
async def create_match_route(data: CreateMatch):
    # проверка
    current_player_is_ready, enemy_is_ready = False, False
    for player in players:
        if player.id == data.current_player.id:
            current_player_is_ready = True
            continue
        if player.id == data.enemy_player.id:
            enemy_is_ready = True
            continue
    if not current_player_is_ready or not enemy_is_ready:
        raise HTTPException(status_code=409, detail="you or enemy player is not ready to match")

    # удалить игроков из списка участников
    players.remove(data.current_player)
    players.remove(data.enemy_player)

    # создать матч и добавить в стэк
    match_id = uuid.uuid4()
    new_match = Match(
        id=match_id,
        player_1=data.current_player,
        player_2=data.enemy_player,
        current_player_move=1,
        map=empty_map.copy()
    )
    matches[match_id] = new_match

    return new_match


# получить матч
@app.get("/matches/{id}")
async def get_match_route(id: uuid.UUID):
    if id not in matches:
        raise HTTPException(status_code=404, detail="match not found")
    return matches[id]


# обновить матч (игрок делает ход)
@app.patch("/matches/{id}")
async def update_match_route(id: uuid.UUID, data: UpdateMatch, background_tasks: BackgroundTasks):
    if id not in matches:
        raise HTTPException(status_code=404, detail="Match not found")
    match = matches[id]
    # проверка, что сейчас твой ход и ячейка пуста
    if match.current_player_move == 1 and data.current_player.id != match.player_1.id:
        raise HTTPException(status_code=403, detail="It's not your move now!")
    if match.current_player_move == 2 and data.current_player.id != match.player_2.id:
        raise HTTPException(status_code=403, detail="It's not your move now!")
    if match.map[data.index_cell]:
        raise HTTPException(status_code=403, detail="Hoidli has already entered this cell")
    if match.winner:
        raise HTTPException(status_code=403, detail="The winner has already been announced. The match cannot be edited.")

    move = "X" if match.current_player_move == 1 else "O"
    match.map[data.index_cell] = move
    match.current_player_move = 1 if match.current_player_move == 2 else 2
    
    # проверка на победу
    winner = find_winner(match.map)
    if winner:
        match.winner = 1 if winner == "X" else 2
    # проверка на ничью - если не осталось больше свободных полей
    elif match.map.count("") == 0:
        match.winner = "draw"

    # удалить матч из списка матчей через время
    if match.winner:
        background_tasks.add_task(delete_match_from_stack, match.id)
    return match


# найти матч по игроку
@app.get("/matches/")
async def get_match_search_route(username: str, id: uuid.UUID) -> Match:
    player = Player(id=id, username=username)

    for keys in matches:
        match = matches[keys]
        if match.player_1 == player or match.player_2 == player:
            return match
    raise HTTPException(status_code=404, detail="This player is not participating in the match")


# игрок покинул матч
@app.patch("/matches/{id}/leave")
async def leave_match_route(id: uuid.UUID, player: Player, background_tasks: BackgroundTasks) -> Match:
    # проверки
    if id not in matches:
        raise HTTPException(status_code=404, detail="This match not found")

    match = matches[id]
    if match.player_1 == player:
        match.winner = 2
    elif match.player_2 == player:
        match.winner = 1
    background_tasks.add_task(delete_match_from_stack, match.id)
    
    return match
