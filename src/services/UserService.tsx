import { IUser } from "../interfaces/User"

export const login = async (data: IUser) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
            credentials: "include",
            body: JSON.stringify({ email: data.email, password: data.password })
        })

        const res = await response.json()

        return res.user as IUser
    } catch (err) {
        return err
    }
}
export const register = async (data: IUser) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
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
        await fetch(`${process.env.REACT_APP_API_URL}/auth/logout`, {
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
            credentials: "include",
        })

    } catch (err) {
        return err
    }

}

export const singleUser = async (id: any) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/user/getsingle/${id}`, {
            headers: { 'Content-Type': 'application/json' },
            method: "GET",
            credentials: "include",
        })

        const res = await response.json()

        return res

    } catch (err) {
        return err
    }
}
export const follow = async (id: any) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/user/follow/${id}`, {
            headers: { 'Content-Type': 'application/json' },
            method: "PATCH",
            credentials: "include",
        })
        const res = await response.json()

        return res
    } catch (err) {
        return err
    }
}
export const unfollow = async (id: any) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/user/unfollow/${id}`, {
            headers: { 'Content-Type': 'application/json' },
            method: "PATCH",
            credentials: "include",
        })
        const res = await response.json()

        return res
    } catch (err) {
        return err
    }
}
export const editProfilePic = async (data: any) => {
    console.log(data[0])
    let formData = new FormData()
    formData.append('file', data[0])
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/user/addprofilepic`, {
            method: "PUT",
            credentials: "include",
            body: formData
        })
        const res = await response.json()
        return res
    } catch (err) {
        return err
    }
}
export const editBio = async (data: any) => {
    console.log(data)
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/user/editbio`, {
            headers: { 'Content-Type': 'application/json' },
            method: "PUT",
            credentials: "include",
            body: JSON.stringify({ bio: data })
        })
        const res = await response.json()
        return res
    } catch (err) {
        return err
    }
}

