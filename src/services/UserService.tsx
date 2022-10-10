import { IUser, ApiResponse } from "../interfaces/User"
import { AxiosResponse } from "axios";
import axios from "axios"

export const login = async (data: IUser): Promise<AxiosResponse<ApiResponse>> => {
    const response: AxiosResponse<ApiResponse> = await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}auth/login`,
        withCredentials: true,
        data: {
            email: data.email,
            password: data.password
        },
    })
    return response
}