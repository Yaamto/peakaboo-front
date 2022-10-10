import { IUser } from "../interfaces/User"

export const login = async (data: IUser) => {

    const response = await fetch(`${process.env.REACT_APP_API_URL}auth/login`, {
        headers: { 'Content-Type': 'application/json' },
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ email: data.email, password: data.password })
    })
    const res = await response.json()
    return res.user as IUser
}