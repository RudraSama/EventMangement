import {useState, useContext, useEffect} from 'react';
import Layout from './../components/Layout';
import {useNavigate} from 'react-router-dom';

import AuthContext from './../providers/AuthContext';

const Signup = () => {

    const {signup, authenticated, isLoading} = useContext(AuthContext);

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [message, setMessage] = useState('');
    const [error, setError] = useState(false);

    const handleSignupSubmit = async(e) => {
        e.preventDefault();
        
        const data = {username: username, email: email, password: password};
        const res = await signup(data);

        if(res){
            setMessage(res.message);

            if(res.error){
                setError(true);
            }
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
                <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
                {message?(
                    <p className={error?"text-red-500":"text-green-500" + " py-4"}>{message}</p>
                ):""}
                <form onSubmit={handleSignupSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-lg font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Username"
                        />
                    </div>
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
                    <div className="mb-4">
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
                            Sign Up
                        </button>
                    </div>
                </form>
                <p className="mt-4 text-center">
                    Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a>
                </p>
            </div>
        </div>
        </Layout>
    );
};

export default Signup;
