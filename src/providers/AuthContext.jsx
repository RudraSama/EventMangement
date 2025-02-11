import {createContext, useState, useEffect} from "react";
import Cookies from 'js-cookie';

import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const token = Cookies.get("token");
        if (token) {
            fetchUserProfile(token);
        } else {
            setLoading(false);
        }
    }, []);

    const fetchUserProfile = async (token) => {
        try {
            const res = await axios.get(API_URL+"/api/auth/getProfile", {
                headers: { Authorization: `Bearer ${token}` },
            });
            if(res.data){
                setUser(res.data);
                setAuthenticated(true);
            }
        } catch (error) {
            console.error("Error fetching profile", error);
        }
        setLoading(false);
    };

    const login = async (credentials) =>{
        try{
            const res = await axios.post(API_URL+"/api/auth/login", credentials);
            if(res.data.token && res.data.user){
                Cookies.set("token", res.data.token);
                setUser(res.data.user);
                setLoading(false);
                setAuthenticated(true);
                return {login: true};
            }
        }
        catch(error){
            console.error("Error while loging", error);
            return {message: error.response.data.message, error: true};
        }

        return {};
    }

    const signup = async (details)=>{
        try{
            const res = await axios.post(API_URL+"/api/auth/register", details)
            setLoading(false);
            return {message: res.data.message};
        }
        catch(error){
            console.error("Error while loging", error);
            return {message: error.response.data.message, error: true};
        }
        return {};
    }

    const logout = ()=>{
        setUser(null);
        setAuthenticated(false);
        Cookies.remove("token");
    }

    return (
        <AuthContext.Provider value={{ user, isLoading, authenticated, login, signup, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
