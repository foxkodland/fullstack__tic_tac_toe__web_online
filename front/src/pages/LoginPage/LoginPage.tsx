import { useState } from "react";
import style from "./LoginPage.module.css";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const navigator = useNavigate()
    const [username, setUsername] = useState("");

    const buttonLoginHandler = async() => {
        if (username.trim() == "") return

        // здесь авторизация на сервере, получения любого ответа

        navigator("/players")
    }

    return (
        <>
            <div className={style.page}>
                <div className={style.content}>
                    <h2 className={style.heading}>Tik-tak-toe online</h2>
                    <div className={style.wrap_input}>
                        <input className={style.input} value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="укажите ваш ник" />
                        <button className={style.button} onClick={buttonLoginHandler}>Начать</button>
                    </div>
                </div>
            </div>
        </>
    )
}