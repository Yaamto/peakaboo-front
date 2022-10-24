import React from 'react';
import Navbar from '../components/Navbar';
import { IUser } from '../interfaces/User';

const Profile = ({ user }: any) => {
    return (
        <div className='h-screen bg-gray-100'>

            <h1>Hello, {user?.username} !</h1>
        </div>
    );
};

export default Profile;