import React, { FC, useState } from 'react';
import { IUser } from '../../interfaces/User';
import { login } from "../../services/UserService"
const Login: React.FC = (): JSX.Element => {
    const [user, setUser] = useState<IUser | {}>()
    const [userResp, setUserResp] = useState<IUser | {}>()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setUser((user) => ({
            ...user,
            [e.target.name]: e.target.value,
        }));
    };
    const handleLogin = (e: React.FormEvent, data: IUser | any): void => {

        e.preventDefault()
        login(data).then((res) => setUserResp(res))
        console.log(userResp)

    }
    return (
        <div>
            <form action="" onSubmit={(e: React.FormEvent) => handleLogin(e, user)} className="bg-slate-300 p-4">
                <label htmlFor="email">email</label>
                <input type="text" name='email' onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)} />
                <label htmlFor="password">password</label>
                <input type="text" name='password' onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)} />
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
};

export default Login;