import React, { useEffect, useState } from 'react';
import Navbar from "../components/Navbar";
import { IUser } from '../interfaces/User';
import { getAuth } from '../services/jwtAuth';

const Home = () => {
    const [user, setUser] = useState<IUser | null>(null)
    const [isAuthenticate, setIsAuthentiticate] = useState<boolean>(false)
    useEffect(() => {
        getAuth().then((res) => {
            setUser(res.data)
            setIsAuthentiticate(res.auth)
        })
    }, [])
    return (
        <div className='h-screen bg-gray-100'>
            <Navbar {...user} />

        </div>
    );
};

export default Home;