import { useEffect, useState } from "react";
import style from "./GamePage.module.css";
import { useParams } from "react-router-dom";
import { apiService } from "../../api/apiService";
import type { Match } from "../../api/types";


export default function GamePage() {
    const params = useParams();
    const matchId = params.id;
    const [match, setMatch] = useState<Match>();

    const apiGetMatch = async(id: string) => {
        const response = await apiService.getMatch(id)
        if (response.success && response.result) {
            setMatch(response.result)
            console.log(response.result);
            
        } else {
            console.error("Ошибка получения матча", response.error)
            console.error(response.result)
        }
    }

    useEffect(()=>{
        if (matchId) {
            apiGetMatch(matchId)
        }
    }, [])

    return (
        <> 
            <div className={style.block}>
                
            </div>
        </>
    )
}