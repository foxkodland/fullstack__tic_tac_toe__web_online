import uuid

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware


from models.models import CreateMatchRequest, Player, Registation, Match


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],         # List of allowed origins
    allow_credentials=True,        # Allow cookies to be sent with requests
    allow_methods=["*"],           # Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],           # Allow all HTTP headers
)

players: list[Player] = []
matches = {}
empty_map = [""] * 9


@app.get("/players")
async def players_route() -> list[Player]:
    return players


# регистрация игрока
@app.post("/registation")
async def registation_route(data: Registation) -> Player:
    new_player = Player(id=uuid.uuid4(), username=data.username)
    players.append(new_player)
    return new_player


# создать матч
@app.post("/match")
async def match_route(data: CreateMatchRequest):
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
@app.get("/match/{id}")
async def match_route(id: uuid.UUID):
    print(id)
    print(type(id))
    if id not in matches:
        raise HTTPException(status_code=404, detail="match not found")
    return matches[id]

# список матчей
@app.get("/dev/matches/")
async def matches_route() -> dict:
    return matches