import React, { FC, useState } from 'react';
import { IUser } from "../interfaces/User"
import { login } from "../services/UserService"
import {
    useNavigate, NavLink
} from 'react-router-dom'



const Login: React.FC = (): JSX.Element => {
    const [user, setUser] = useState<IUser>()
    const navigate = useNavigate()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setUser((user) => ({
            ...user,
            [e.target.name]: e.target.value,
        }));
    };
    const handleLogin = (e: React.FormEvent, data: IUser | any): void => {

        e.preventDefault()
        if (user === undefined || user.email === "" || user.password === "") {

        } else {
            login(data).then((res) => {
                if (res !== undefined) {

                    setTimeout(() => {
                        navigate("/")
                    }, 1000);
                }
            })
        }


    }
    return (
        <div className='bg-gradient-to-r from-purpleD to-purpleL h-screen flex justify-center items-center'>

            <form action="" onSubmit={(e: React.FormEvent) => handleLogin(e, user)} className="bg-white p-4 w-96 h-1/2 flex flex-col items-center rounded-3xl  ">
                <p className='text-center Dosis text-purpleD text-3xl mt-1'>Peekaboo !</p>
                <img src={process.env.PUBLIC_URL + 'profile.svg'} alt="" width="80" height="80" className='mx-auto mt-3' />
                <div className='flex flex-col items-center'>
                    <label htmlFor="email" className='mt-3 self-start text-purpleD'>Email</label>
                    <input type="text" name='email' className='mt-1 px-2 py-1 outline-0 border-b-2 border-purpleL' onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)} placeholder="Email..." />
                    <label htmlFor="password" className='mt-3 self-start text-purpleD'>Password</label>
                    <input type="password" name='password' className='mt-1 px-2 py-1 outline-0 border-b-2 border-purpleL' onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)} placeholder="Password..." />
                </div>
                <button type='submit' className='mt-8 text-purpleD border border-purpleD px-4 py-2 rounded-xl hover:text-white hover:bg-purpleD duration-300'>Submit</button>
                <p className='pt-6 hover:scale-105 duration-300'> <NavLink to="/register" className="text-purpleD">Click here to register</NavLink> </p>
            </form>

        </div>
    );
};

export default Login;