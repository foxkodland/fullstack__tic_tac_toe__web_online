import { useEffect, useState } from "react";
import style from "./PlayersPage.module.css";
import global_styles from "../../styles/global.module.css";
import { apiService } from "../../api/apiService";
import type { Player } from "../../api/types";
import { deleteFromLocalStorage, getFromLocalStorage } from "../../storage/localStorage";
import Button from "../../Button/Button";
import { KEY_USERNAME_IN_STORAGE, KEY_UUID_IN_STORAGE } from "../../config";
import { useNavigate } from "react-router-dom";

export default function PlayersPage() {
    const navigator = useNavigate()
    const [players, setPlayers] = useState<Player[]>([]);
    const myUuid = getFromLocalStorage(KEY_UUID_IN_STORAGE)

    const apiGetPlayers = async () => {
        const response = await apiService.getPlayers()
        if (response.success && response.result) {
            setPlayers(response.result)
        }
    }

    useEffect(() => {
        apiGetPlayers()
    }, [])

    const backward = () => {
        deleteFromLocalStorage(KEY_UUID_IN_STORAGE)
        navigator("/")
    }

    const startMatch = async (enemy_player: Player) => {
        const username = getFromLocalStorage(KEY_USERNAME_IN_STORAGE)
        const id = getFromLocalStorage(KEY_UUID_IN_STORAGE)
        if (!username || !id) return
        const currentPlayer = {
            "username": username,
            "id": id 
        }
        const response = await apiService.createMatch(currentPlayer, enemy_player);
        if (response.success) {
            navigator(`/match/${response.result?.id}`)
        } else {
            console.error("Ошибка при создании матча", response.error)
        }
    }

    return (
        <>
            <div className={style.page}>
                <div className={style.wrap_back}>
                    <Button text="Назад" onClick={backward} />
                </div>
                <div className={style.content}>
                    <h1 className={global_styles.heading}>Список игроков</h1>
                    <div className={style.players_block}>
                        {players.map(playerObj =>
                            <div key={playerObj.id} className={style.player_row}>
                                <p className={style.username}>{playerObj.username}</p>
                                {myUuid != playerObj.id && <Button text="Играть" onClick={() => startMatch(playerObj)} />}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}