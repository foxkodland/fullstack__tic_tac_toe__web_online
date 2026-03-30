import style from "./FinishLine.module.css";

export default function FinishLine({ size = "small" }: { size?: "small" | "large" }) {
    return (
        <> 
            <div className={style.line} style={{width: size == "small" ? "140px" : "200px"}} />
        </>
    )
}