import { IPost } from "../interfaces/Post"


export const post = async (data: IPost) => {

    try {

        let formData = new FormData()
        formData.append('content', data.content)
        for (let i = 0; i < data.media.length; i++) {
            formData.append('media', data.media[i])
        }
        const response = await fetch(`${process.env.REACT_APP_API_URL}post/addPost`, {
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