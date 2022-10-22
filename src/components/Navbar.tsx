import { Box, ClickAwayListener } from '@mui/material';
import React, { useEffect, useState, useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { getAuth } from "../components/utils/isAuth"
import { IUser } from '../interfaces/User';
import { logout } from "../services/UserService"
import { SxProps } from '@mui/system';
const Navbar = (userInfo: IUser) => {

    const [isExpanded, toggleExpansion] = useState(false);
    const [isAuthenticate, setIsAuthentiticate] = useState<boolean>(false)
    const [avatarNumber, setAvatarNumber] = useState<any | null>()
    const [isProfilePic, setIsProfilePic] = useState(false)
    const [user, setUser] = useState<IUser>()
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen((prev) => !prev);
    };

    const handleClickAway = () => {
        setOpen(false);
    };
    const styles: SxProps = {
        position: 'absolute',
        top: 45,
        right: 0,
        left: 0,
        width: 'auto',
        zIndex: 1,
        border: '1px solid gray',
        bgcolor: 'background.paper',
    };

    const navigate = useNavigate()


    useEffect(() => {
        getAuth().then((res) => {
            if (res.data.profilePic === "") {
                setIsProfilePic(false)
            } else {
                setIsProfilePic(true)
            }
            setIsAuthentiticate(res.auth)
            const test = localStorage.getItem("avatarName")
            setAvatarNumber(test)
        })



    }, [])
    const handleLogout = () => {
        logout().then(() => navigate("/login"))
    }
    return (
        <>
            <nav className="flex items-center justify-between flex-wrap bg-white text-black border-b-2 p-4 lg:py-4 lg:px-56">
                <div className="flex items-center flex-shrink-0 mr-6">
                    <h2>Peekaboo!</h2>

                </div>
                <div className='flex items-center lg:order-1 mx-2'>

                    {isAuthenticate ? (<ClickAwayListener
                        mouseEvent="onMouseDown"
                        touchEvent="onTouchStart"
                        onClickAway={handleClickAway}
                    >
                        <Box sx={{ position: 'relative' }}>
                            <div className='flex items-center p-1 rounded hover:cursor-pointer hover:bg-purpleD duration-300' onClick={handleClick}>
                                <img className="mx-2" src={process.env.PUBLIC_URL + "avatar" + "4" + ".svg"} alt="" width="40" />
                                <span>{!isProfilePic && userInfo?.username}</span>
                            </div>
                            {open ? (
                                <Box sx={styles}>
                                    <button className="px-4 hover:bg-purpleD hover:text-white duration-300">Settings</button>
                                    <button className="px-5 hover:bg-purpleD hover:text-white duration-300" onClick={handleLogout}>Logout</button>
                                </Box>
                            ) : null}
                        </Box>
                    </ClickAwayListener>) : ""}
                </div>
                <div className="block lg:hidden">
                    <button
                        className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
                        onClick={() => toggleExpansion(!isExpanded)}
                    >
                        <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
                    </button>
                </div>

                <div className={`${isExpanded ? `block` : `hidden`
                    } w-full block lg:ml-auto lg:flex lg:items-center lg:w-auto`}>
                    <div className="text-sm lg:flex-grow lg:flex items-center">

                        <NavLink to="/" className="block mt-8 mx-5 lg:inline-block lg:mt-0 mr-4"><img src={process.env.PUBLIC_URL + "home.png"} alt="" width="25px" /></NavLink>
                        {isAuthenticate && <NavLink to="/" className="block mt-8 mx-5 lg:inline-block lg:mt-0 mr-4"><img src={process.env.PUBLIC_URL + "comment.png"} alt="" width="25px" /></NavLink>}
                        {isAuthenticate && <NavLink to="/" className="block mt-8 mx-5 lg:inline-block lg:mt-0 mr-4"><img src={process.env.PUBLIC_URL + "bell.png"} alt="" width="25px" /></NavLink>}
                        {!isAuthenticate && <NavLink to="/login" className="block mt-8 mx-5 lg:inline-block lg:mt-0 mr-4"><button className='bg-gradient-to-r from-purpleD to-purpleL px-4 py-2 rounded-xl text-white text-lg hover:-translate-y-1 duration-300'>Login</button></NavLink>}

                    </div>
                </div>

            </nav>
        </>
    );
};

export default Navbar;