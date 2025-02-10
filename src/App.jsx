import {Routes, Route} from 'react-router-dom';
import Events from './pages/Events';
import Event from './pages/Event';
import CreateEvent from './pages/CreateEvent';
import Login from './pages/Login';
import Signup from './pages/Signup';
import {AuthProvider} from './providers/AuthContext';

import './App.css'

function App() {

  return (
      <AuthProvider>
        <Routes>
            <Route path="*" element={<Home/>} />
            <Route path="/" element={<Home/>} />
            <Route path="/events" element={<Events/>} />
            <Route path="/event/:slug" element={<Event/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/event/create" element={<CreateEvent/>} />
        </Routes>
    </AuthProvider>
  )
}


const Home = ()=>{

    if(true){
        window.location.href = "/events";
    }
    return (
        <>
        </>
    );
}

export default App
