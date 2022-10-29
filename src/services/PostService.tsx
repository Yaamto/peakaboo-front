import { IPost } from "../interfaces/Post"


export const post = async (data: IPost) => {

    try {

        let formData = new FormData()
        formData.append('content', data.content)
        for (let i = 0; i < data.media.length; i++) {
            formData.append('media', data.media[i])
        }
        const response = await fetch(`${process.env.REACT_APP_API_URL}/post/addPost`, {
            method: "POST",
            credentials: "include",
            body: formData
        })

        const res = await response.json()

        return res as IPost
    } catch (err) {
        return err
    }
}

export const getFeed = async (page: number) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/post/feed/` + page, {
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include",
    })
    const res = await response.json()

    return res;
}

export const singlePost = async (id: any) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/post/singlePost/` + id, {
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include",
    })
    const res = await response.json()

    return res;
}