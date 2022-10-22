import React from 'react';
import Navbar from '../components/Navbar';
import PostToAdd from '../components/PostToAdd';
import { IUser } from '../interfaces/User';

const Home = (userInfo: IUser) => {

    return (
        <div className='h-screen bg-gray-100' >
            <Navbar {...userInfo} />
            <PostToAdd {...userInfo} />

        </div>
    );
};

export default Home;