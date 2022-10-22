import React, { createContext, useState, useEffect } from 'react'
import { IUser } from '../../interfaces/User'
import { getAuth } from '../utils/isAuth'
import { RouteProps } from "react-router-dom";


let context = {
    username: "",
}
export const UserContext = createContext(context)

const UserContextProvider = async (props: any) => {

    const user = await getAuth()
    console.log(user)
    context.username = user.data.username

    return (
        <UserContext.Provider value={context}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider