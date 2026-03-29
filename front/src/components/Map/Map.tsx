import type { AllowedIndexMap, Match } from "../../api/types";
import style from "./Map.module.css";

export default function Map({ match, onClickCell }: {match: Match, onClickCell: (index: AllowedIndexMap) => void}) {
    return (
        <> 
            <div className={style.map}>
                {match.map.map((cell, index) => 
                    <div key={index} className={style.cell} onClick={()=>onClickCell(index as AllowedIndexMap)}>{cell}</div>
                )}
            </div>
        </>
    )
}