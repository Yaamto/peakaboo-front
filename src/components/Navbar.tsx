import React, { useEffect, useState, useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { getAuth } from "../components/utils/isAuth"
import { logout } from "../services/UserService"
const Navbar = () => {
    const [isAuth, setIsAuth] = useState<boolean>(false)
    const navigate = useNavigate()
    useEffect(() => {
        getAuth().then(res => setIsAuth(res))
    }, [])
    const handleLogout = () => {
        logout().then(() => navigate("/login"))
    }
    return (
        <>
            <div className="nav">
                <p className='logo'><NavLink to="/">Peekaboo!</NavLink> </p>

                <input type="checkbox" name="burger" id="burger" />
                <ul className='navList'>
                    <li><NavLink to="/">Home</NavLink></li>
                    {isAuth ? (<button onClick={handleLogout}>Logout</button>) : (<NavLink to="/login">Login</NavLink>)}
                </ul>
            </div>


        </>
    );
};

export default Navbar;