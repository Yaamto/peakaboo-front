import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { IUser } from '../interfaces/User';
import { getAuth } from '../services/jwtAuth';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    Button
} from '@chakra-ui/react'
import { BsChevronDown } from 'react-icons/bs'
import { logout } from '../services/UserService';

const Navbar = ({ user, setUser, setIsAuth }: any) => {
    const [isExpanded, toggleExpansion] = useState(false);
    const location: any = useLocation()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout().then(() => navigate("/login"))
        setUser(null)
        setIsAuth(false)
    }

    return (
        <>
            {location.pathname === "/register" || location.pathname === "/login" ? null :
                <nav className="flex items-center justify-between flex-wrap bg-white text-black border-b-2 p-4 lg:py-4 lg:px-56">
                    <div className="flex items-center flex-shrink-0 mr-6">
                        <h2 className='text-xl hover:cursor-pointer' onClick={() => navigate("/")}>Peekaboo!</h2>
                    </div>
                    <div className='flex items-center lg:order-1 mx-2'>
                        {user !== null &&
                            <Menu>
                                <MenuButton as={Button} rightIcon={<BsChevronDown />}>
                                    <div className='flex items-center my-2 rounded hover:cursor-pointer hover:bg-purpleD duration-300'>
                                        <img src={user?.profilePic !== "" ? user?.profilePic : process.env.PUBLIC_URL + "avatar" + "4" + ".svg"} alt="" width="40" />
                                        <span>{user?.username}</span>
                                    </div>
                                </MenuButton>
                                <MenuList>
                                    <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
                                    <MenuItem>Setting</MenuItem>
                                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                </MenuList>
                            </Menu>
                        }
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
                            <NavLink to="/" className="block mt-8 mx-5 lg:inline-block lg:mt-0 mr-4"><img src={process.env.PUBLIC_URL + "comment.png"} alt="" width="25px" /></NavLink>
                            <NavLink to="/" className="block mt-8 mx-5 lg:inline-block lg:mt-0 mr-4"><img src={process.env.PUBLIC_URL + "bell.png"} alt="" width="25px" /></NavLink>
                            {user == null && <NavLink to="/login" className="block mt-8 mx-5 lg:inline-block lg:mt-0 mr-4"><button className='bg-gradient-to-r from-purpleD to-purpleL px-4 py-2 rounded-xl text-white text-lg hover:-translate-y-1 duration-300'>Login</button></NavLink>}
                        </div>
                    </div>

                </nav>
            }
        </>
    )
};

export default Navbar;