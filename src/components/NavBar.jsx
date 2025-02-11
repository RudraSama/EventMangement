import React, { useState, useContext } from 'react';
import {Link, useNavigate} from 'react-router-dom';

import AuthContext from './../providers/AuthContext';

const NavBar = ()=>{

    const {user, authenticated, isLoading, logout} = useContext(AuthContext);
    const navigate = useNavigate();

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };


    const handleLogout = ()=>{
        logout();
        navigate("/login");
    }

    return (
       <header className="p-4">
         <div className="relative max-w-screen-xl mx-auto flex items-center justify-between">
             <div className="text-2xl font-bold">LOGO</div>

             <nav className="hideNavBar text-white space-x-6">
                 <Link to="/events" className="text-gray-700 hover:underline">Events</Link>

                 {(authenticated)?(
                     <p className="text-gray-700">{user?.username}</p>
                     <button className="text-gray-700 hover:underline" onClick={handleLogout}>Logout</button>
                 ):(
                     <>
                     <Link to="/login" className="text-gray-700 hover:underline">Login</Link>
                     <Link to="/signup" className="text-gray-700 hover:underline">Signup</Link>
                     </>
                 )}
             </nav>

             <button 
                 onClick={toggleMobileMenu} 
                 className="md:hidden text-white focus:outline-none"
             >
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="black" className="w-6 h-6">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                 </svg>
             </button>
         </div>

         <div className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"} absolute left-0 top-20 bg-[#fffcf2] p-4 w-full`}>
             <div className="w-5/6 mx-auto">
                 <Link to="/events" className="block text-gray-700 py-2">Events</Link>
                 <Link to="/login" className="block text-gray-700 py-2">Login</Link>
                 <Link to="/signup" className="block text-gray-700 py-2">Signup</Link>
             </div>
         </div>
      </header>    
    );
}

export default NavBar;
