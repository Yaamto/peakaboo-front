import React, { useEffect, useState, useContext } from 'react'
import { IUser } from '../../interfaces/User'

let isAuth = true

export async function getAuth() {
    try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}jwtid`, {
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        const data = await res.json()
        if (data.user._id) {
            isAuth = true
            const obj = {
                auth: isAuth,
                data: data.user
            }
            return obj

        } else {
            isAuth = false
            const obj = {
                auth: isAuth,
                data: data.user
            }
            return obj
        }
    } catch (err) {
        isAuth = false
        const obj = {
            auth: isAuth,
            data: ""
        }
        return obj

    }
}


