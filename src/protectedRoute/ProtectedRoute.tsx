import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { getAuth } from "../components/utils/isAuth"

const ProtectedRoute = ({ children }: any) => {

    const [isAuth, setIsAuth] = useState(true)

    useEffect(() => {
        getAuth().then((res) => setIsAuth(res.auth))
    }, [])

    return isAuth ? children : <Navigate to='/login' />
};

export default ProtectedRoute;