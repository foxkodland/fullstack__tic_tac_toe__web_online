from fastapi import FastAPI


app = FastAPI()

list_players = []

@app.get("/")
async def index():
    return "ok"


@app.get("/players")
async def players():
    return list_players


@app.post("/registation")
async def registation(username: str):
    list_players.append(username)
    return "ok"