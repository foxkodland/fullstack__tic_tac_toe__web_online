import FinishLine from "../../FinishLine/FinishLine";
import type { AllowedIndexMap, findWinnerScheme, Match } from "../../types/types";
import style from "./Map.module.css";


export default function Map({ match, onClickCell, finishLinePos }: {match: Match, onClickCell: (index: AllowedIndexMap) => void, finishLinePos: findWinnerScheme | undefined}) {
    const mapDirection = {
        "vertical": "90deg",
        "horizontal": "0deg",
        "diagonal-top": "-45deg",
        "diagonal-bottom": "45deg",
    }

    const rotateLine = () => {
        if (!finishLinePos) return
        return mapDirection[finishLinePos.direction]
    }

    const offsetFinishLineHorizontal = () => {
        if (!finishLinePos) return "0px"
        if (finishLinePos.direction == "vertical") {
            return `${finishLinePos.index * 70 + 35}px`
        }
        if (finishLinePos.direction == "diagonal-top" || finishLinePos.direction == "diagonal-bottom") {
            return "35px"
        }
    }

    const offsetFinishLineVertical = () => {
        if (!finishLinePos) return "0px"
        if (finishLinePos.direction == "horizontal") {
            const index = finishLinePos.index / 3 // чтобы получить номер ряда: 0, 1, 2
            return `${index * 70 + 35}px`
        }
        if (finishLinePos.direction == "diagonal-top") {
            return `${2 * 70 + 35}px`
        }
        if (finishLinePos.direction == "diagonal-bottom") {
            return `35px`
        }
    }
    
    return (
        <> 
            <div className={style.map}>
                {match.map.map((cell, index) => 
                    <div key={index} className={style.cell} onClick={()=>onClickCell(index as AllowedIndexMap)}>{cell}</div>
                )}
                {/* зачёркивание победителя */}
                {finishLinePos && 
                    <div className={style.finish_line_wrap} style={{rotate: rotateLine(), top: offsetFinishLineVertical(), left: offsetFinishLineHorizontal()}}>
                        <FinishLine size={finishLinePos.direction.includes("diagonal") ? "large" : "small"} />
                    </div>
                }
            </div>
        </>
    )
}