export const comment = async (data: any, id: any) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/comment/addComment/${id}`, {
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
            credentials: "include",
            body: JSON.stringify({ content: data })

        })
        const res = await response.json()
        console.log(res)
        return res
    } catch (err) {
        return err
    }
}
export const like = async (id: any) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/comment/likeComment/${id}`, {
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
            credentials: "include",

        })
        const res = await response.json()
        console.log(res)
        return res
    } catch (err) {
        return err
    }
}