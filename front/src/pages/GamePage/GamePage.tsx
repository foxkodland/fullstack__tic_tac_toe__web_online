import { useEffect, useRef, useState } from "react";
import style from "./GamePage.module.css";
import global_styles from "../../styles/global.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { apiService } from "../../api/apiService";
import Map from "../../components/Map/Map";
import { getFromLocalStorage } from "../../storage/localStorage";
import { KEY_USERNAME_IN_STORAGE, KEY_UUID_IN_STORAGE } from "../../config";
import Button from "../../components/Button/Button";
import { findWinner } from "../../services/gameLogic";
import type { AllowedIndexMap, findWinnerScheme, Match } from "../../types/types";


export default function GamePage() {
    const navigator = useNavigate();
    const params = useParams();
    const matchId = params.id;
    const intervalIdRef = useRef<number | null>(null);
    const [match, setMatch] = useState<Match>();
    const [infoText, setInfoText] = useState<string>("Скоро старт");
    const [finishLinePos, setFinishLinePos] = useState<findWinnerScheme>();

    const infoBar = {
        setWinner: (match: Match) => {
            const username = getFromLocalStorage(KEY_USERNAME_IN_STORAGE)
            const id = getFromLocalStorage(KEY_UUID_IN_STORAGE)
            if (!username || !id) return
            const currentPlayer = {
                "username": username,
                "id": id
            }
            if (match.winner == "draw") {
                setInfoText("У вас ничья =/")
            }
            else if (
                (match?.player_1.id == currentPlayer.id && match.winner == 1)
                || (match?.player_2.id == currentPlayer.id && match.winner == 2)
            ) {
                setInfoText("Вы победили!")
            } else {
                setInfoText("Вы проиграли =(")
            }
        },

        startMatch: () => {
            if (!match) {
                console.log("вышел, нет матча", match);
                
                return
            }
            console.log("здесь");
            
            const username = getFromLocalStorage(KEY_USERNAME_IN_STORAGE)
            const id = getFromLocalStorage(KEY_UUID_IN_STORAGE)
            if (!username || !id) return
            const currentPlayer = {
                "username": username,
                "id": id
            }
            if (match?.player_1.id == currentPlayer.id) {
                setInfoText("Вы начинаете!")
            } else {
                setInfoText("Оппонент ходит первый")
            }
        }
    }

    // проверка, что матч окончен
    useEffect(() => {
        if (!match) return
        if (infoText == 'Скоро старт') {
            infoBar.startMatch()
        }
        if (match.winner) {
            // поменять надпись над полем
            infoBar.setWinner(match)
            // удалить interval
            if (intervalIdRef.current) {
                console.log("Clearing interval...");
                clearInterval(intervalIdRef.current);
                intervalIdRef.current = null;
            }
            // нарисовать линию зачёркивания
            const result = findWinner(match.map);
            if (result) {
                setFinishLinePos(result)
            }
        }
    }, [match])

    const apiGetMatch = async (id: string) => {
        const response = await apiService.getMatch(id)
        if (response.success && response.result) {
            setMatch(response.result)
            return response.result
        } else {
            console.error("Ошибка получения матча", response.error)
            console.error(response.result)
        }
    }

    const playerMove = async (index: AllowedIndexMap) => {
        if (index < 0 || index > 8) {
            console.error("индекс ячейки выпал из диапазона 0-8")
            return
        }
        const username = getFromLocalStorage(KEY_USERNAME_IN_STORAGE)
        const id = getFromLocalStorage(KEY_UUID_IN_STORAGE)
        if (!username || !id || !matchId) return
        const currentPlayer = {
            "username": username,
            "id": id
        }
        const response = await apiService.makeMove(matchId, { current_player: currentPlayer, index_cell: index })
        if (response.success && response.result) {
            setMatch(response.result)
        } else {
            console.error("Ошибка хода", response.error)
        }
    }

    // получать данные матча
    useEffect(() => {
        // Функция, которая будет вызываться по интервалу
        const fetchMatchData = () => {
            if (matchId) {
                apiGetMatch(matchId);
            } else {
                console.log("matchId is null, stopping fetch interval.");
                // Если matchId стал null, можно остановить интервал
                if (intervalIdRef.current) {
                    clearInterval(intervalIdRef.current);
                    intervalIdRef.current = null;
                }
            }
        };

        if (!matchId) return
        fetchMatchData();
        intervalIdRef.current = setInterval(fetchMatchData, 1000);

        return () => {
            if (intervalIdRef.current) {
                console.log("Clearing interval...");
                clearInterval(intervalIdRef.current);
                intervalIdRef.current = null;
            }
        };

    }, [matchId]);

    const backward = async () => {
        // отправить api запрос, чтобы удалить игрока из списка игроков
        const username = getFromLocalStorage(KEY_USERNAME_IN_STORAGE)
        const id = getFromLocalStorage(KEY_UUID_IN_STORAGE)
        if (!username || !id || !matchId) return
        const currentPlayer = {
            "username": username,
            "id": id
        }
        await apiService.leaveMatch(matchId, { ...currentPlayer })
        navigator("/")
    }

    return (
        <>
            <div className={style.page}>
                <div className={global_styles.wrap_back}>
                    <Button text="Покинуть" onClick={backward} />
                </div>
                <h1 className={global_styles.heading}>Поле битвы</h1>
                <p className={global_styles.info}>{infoText}</p>
                {match && <Map match={match} onClickCell={playerMove} finishLinePos={finishLinePos} />}
            </div>
        </>
    )
}