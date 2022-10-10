import React, { useEffect, useState, useContext } from 'react'

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
        console.log(data)
        if (data.user._id) {
            isAuth = true
            return isAuth

        } else {
            isAuth = false
            return isAuth
        }
    } catch (err) {
        isAuth = false
        return isAuth

    }
}


