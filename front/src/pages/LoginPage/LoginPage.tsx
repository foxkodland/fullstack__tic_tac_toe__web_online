import { useEffect, useState } from "react";
import style from "./LoginPage.module.css";
import global_styles from "../../styles/global.module.css";
import { useNavigate } from "react-router-dom";
import { apiService } from "../../api/apiService";
import { getFromLocalStorage, setToLocalStorage } from "../../storage/localStorage";
import { KEY_USERNAME_IN_STORAGE, KEY_UUID_IN_STORAGE } from "../../config";


export default function LoginPage() {
    const navigator = useNavigate()
    const [username, setUsername] = useState("");

    const buttonLoginHandler = async() => {
        if (username.trim() == "") return

        const response = await apiService.registation({"username": username})
        if (!response.success || response.error) {
            console.error("Ошибка при регистрации", response.error);
            return
        }

        setToLocalStorage(KEY_UUID_IN_STORAGE, response.result!.id)
        setToLocalStorage(KEY_USERNAME_IN_STORAGE, username)
        navigator("/players")
    }

    useEffect(()=>{
        const usernameStorage = getFromLocalStorage(KEY_USERNAME_IN_STORAGE)
        if (usernameStorage) {
            setUsername(usernameStorage)
        }
    }, [])

    return (
        <>
            <div className={style.page}>
                <div className={style.content}>
                    <h2 className={global_styles.heading}>Tik-tak-toe online</h2>
                    <div className={style.wrap_input}>
                        <input className={style.input} value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="укажите ваш ник" />
                        <button className={style.button} onClick={buttonLoginHandler}>Присоединиться</button>
                    </div>
                </div>
            </div>
        </>
    )
}