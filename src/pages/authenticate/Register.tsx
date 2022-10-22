import React, { FC, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { IUser } from '../../interfaces/User';
import { register } from "../../services/UserService"
import {
    useNavigate, NavLink
} from 'react-router-dom'
const Register: React.FC = (): JSX.Element => {
    const [user, setUser] = useState<IUser>()
    const navigate = useNavigate()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setUser((user) => ({
            ...user,
            [e.target.name]: e.target.value,
        }));
    };

    const handleRegister = (e: React.FormEvent, data: IUser | any): void => {
        e.preventDefault()
        if (user === undefined || user.email === "" || user.password === "" || user.username === "") {
            toast.error('Fill all the fields', {
                duration: 2000
            });
        } else {
            register(data).then((res) => {
                if (res === 409) {
                    toast.error('This email is already used!', {
                        duration: 2000
                    })
                } else {
                    toast.success('Successfully registered!', {
                        duration: 900
                    });
                    setTimeout(() => {
                        navigate("/login")
                    }, 1000);
                }
            })
        }

    }
    return (
        <div className='bg-gradient-to-r from-purpleD to-purpleL h-screen flex justify-center items-center'>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <form action="" onSubmit={(e: React.FormEvent) => handleRegister(e, user)} className="bg-white p-4 w-96 h-auto flex flex-col items-center rounded-3xl  ">
                <p className='text-center Dosis text-purpleD text-3xl mt-1'>Peekaboo !</p>
                <img src={process.env.PUBLIC_URL + 'profile.svg'} alt="" width="80" height="80" className='mx-auto mt-3' />
                <div className='flex flex-col items-center'>
                    <label htmlFor="username" className='mt-3 self-start text-purpleD'>Username</label>
                    <input type="text" name='username' className='mt-1 px-2 py-1 outline-0 border-b-2 border-purpleL' onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)} placeholder="Username..." />
                    <label htmlFor="email" className='mt-3 self-start text-purpleD'>Email</label>
                    <input type="text" name='email' className='mt-1 px-2 py-1 outline-0 border-b-2 border-purpleL' onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)} placeholder="Email..." />
                    <label htmlFor="password" className='mt-3 self-start text-purpleD'>Password</label>
                    <input type="password" name='password' className='mt-1 px-2 py-1 outline-0 border-b-2 border-purpleL' onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)} placeholder="Password..." />
                </div>
                <button type='submit' className='mt-8 text-purpleD border border-purpleD px-4 py-2 rounded-xl hover:text-white hover:bg-purpleD duration-300'>Submit</button>
                <p className='pt-6 hover:scale-105 duration-300'> <NavLink to="/login" className="text-purpleD">Already got an account ? Click here</NavLink> </p>
            </form>

        </div>
    );
};

export default Register;