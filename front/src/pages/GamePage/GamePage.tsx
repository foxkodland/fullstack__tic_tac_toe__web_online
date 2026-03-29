import { useEffect, useRef, useState } from "react";
import style from "./GamePage.module.css";
import global_styles from "../../styles/global.module.css";
import { useParams } from "react-router-dom";
import { apiService } from "../../api/apiService";
import type { AllowedIndexMap, Match } from "../../api/types";
import Map from "../../components/Map/Map";
import { getFromLocalStorage } from "../../storage/localStorage";
import { KEY_USERNAME_IN_STORAGE, KEY_UUID_IN_STORAGE } from "../../config";


export default function GamePage() {
    const params = useParams();
    const matchId = params.id;
    const intervalIdRef = useRef<number | null>(null);
    const [match, setMatch] = useState<Match>();

    const apiGetMatch = async (id: string) => {
        const response = await apiService.getMatch(id)
        if (response.success && response.result) {
            setMatch(response.result)
            console.log(response.result);

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
            console.error(response.result)
        }
    }

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

    return (
        <>
            <div className={style.page}>
                <h1 className={global_styles.heading}>Поле битвы</h1>
                {match && <Map match={match} onClickCell={playerMove} />}
            </div>
        </>
    )
}