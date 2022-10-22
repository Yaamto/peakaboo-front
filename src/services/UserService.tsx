import { IUser } from "../interfaces/User"

export const login = async (data: IUser) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}auth/login`, {
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
            credentials: "include",
            body: JSON.stringify({ email: data.email, password: data.password })
        })
        console.log(response)
        const res = await response.json()

        return res.user as IUser
    } catch (err) {
        return err
    }
}

export const register = async (data: IUser) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}auth/register`, {
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
            credentials: "include",
            body: JSON.stringify({ username: data.username, email: data.email, password: data.password })
        })

        if (response.status === 409) {
            return response.status
        } else {
            const res = await response.json()
            return res.user as IUser
        }

    } catch (err) {
        return err
    }
}

export const logout = async () => {
    try {
        await fetch(`${process.env.REACT_APP_API_URL}auth/logout`, {
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
            credentials: "include",
        })

    } catch (err) {
        return err
    }

}