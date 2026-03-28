import { useState } from "react";
import style from "./LoginPage.module.css";

export default function LoginPage() {
    const [username, setUsername] = useState("");

    return (
        <>
            <div className={style.page}>
                <div className={style.content}>
                    <h2 className={style.heading}>Tik-tak-toe online</h2>
                    <div className={style.wrap_input}>
                        <input className={style.input} value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="укажите ваш ник" />
                        <button className={style.button}>Начать</button>
                    </div>
                </div>
            </div>
        </>
    )
}