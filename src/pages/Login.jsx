import {useEffect, useState, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import Layout from './../components/Layout';

import AuthContext from './../providers/AuthContext';
import axios from 'axios';
import Cookies from 'js-cookie';

const Login = () => {

    const navigate = useNavigate();

    const {login, authenticated, isLoading} = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [message, setMessage] = useState('');

    const API_URL = import.meta.env.VITE_API_URL;

    const handleLoginSubmit = async(e) => {
        e.preventDefault();

        const data = {email: email, password: password};
        const res = await login(data);

        if(res.login){
            navigate("/events");
        }

        if(res.error){
            setMessage(res.message);
        }

    };

    useEffect(()=>{
        if(authenticated){
            navigate("/events");
        }
    }, [isLoading]);

    return (
        <Layout>
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                <p className="text-xl text-red-500">{message}</p>
                <form onSubmit={handleLoginSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-lg font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button type="submit" className="w-full sm:w-auto bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            Login
                        </button>
                    </div>
                </form>
                <p className="mt-4 text-center">
                    Don't have an account? <a href="/signup" className="text-blue-600 hover:underline">Sign up</a>
                </p>
            </div>
        </div>
        </Layout>
    );
};

export default Login;
