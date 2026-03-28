

export const getFromLocalStorage = (key: string) => {
    return localStorage.getItem(key)
}

export const setToLocalStorage = (key: string, value: string) => {
    localStorage.setItem(key, value)
}

export const deleteFromLocalStorage = (key: string) => {
    localStorage.removeItem(key)
}