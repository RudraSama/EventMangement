import {useState, useEffect, useContext} from 'react';
import {useParams} from 'react-router-dom';

import AuthContext from './../providers/AuthContext';

import Layout from './../components/Layout';

import axios from 'axios';
import Cookies from 'js-cookie';

import io from 'socket.io-client';

const Event = ()=>{
    
    const API_URL = import.meta.env.VITE_API_URL;
    const {user, isLoading, authenticated} = useContext(AuthContext);

    const [event, setEvent] = useState({});
    const [message, setMessage] = useState('');
    const [registered, setRegistered] = useState(false);

    const [onlineAttendies, setOnlineAttendies] = useState(0);

    const { slug } = useParams(); 

    const socket = io(API_URL);

    useEffect(()=>{
        fetchEvent();

        let data = {};
        if(user){
            socket.on('eventUpdated', (data)=>{
                if(data.event_id === slug)
                    setOnlineAttendies(data.count);
            });


            data.event_id = slug,
            data.user_id = user._id

            socket.emit('joinEvent', data);
        }


        return ()=>{
            socket.emit('leaveEvent', data);
            socket.off("eventUpdated");
            console.log("out");
        }
    },[isLoading]);

    const alreadyRegistered = (attendies)=>{
        return attendies.includes(user?._id);
    }


    const fetchEvent = async()=>{
        try{
            const res = await axios.get(API_URL+"/api/getEvent/"+slug, {
            });

            setEvent(res.data);
            setRegistered(alreadyRegistered(res.data.eventAttendies));
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    }

    const registerToEvent = async()=>{
        try{
            const data = {user_id : user._id};
            const token = Cookies.get("token");

            const res = await axios.post(API_URL+"/api/registerToEvent/"+event._id, data, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if(res.data){
                setMessage(res.data.message);
                setRegistered(true);
            }

        }
        catch(error){
            console.error("Error fetching events:", error);
        }
    }

    const unregisterToEvent = async()=>{
        try{
            const data = {user_id : user._id};
            const token = Cookies.get("token");

            const res = await axios.post(API_URL+"/api/unregisterToEvent/"+event._id, data, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if(res.data){
                setMessage(res.data.message);
                setRegistered(false);
            }

        }
        catch(error){
            console.error("Error fetching events:", error);
        }

    }

    return (
        <Layout>
            <div className="my-5 mx-auto bg-white shadow-lg rounded-lg overflow-hidden">

                <img className="w-full h-96 object-cover" src={event.eventBannerUrl} alt="Event Image" />

                <div className="px-8 py-6">
                    {onlineAttendies}
                    <h1 className="text-4xl font-semibold text-gray-800">{event.eventName}</h1>

                    <div className="flex justify-between items-center mt-4">
                        <p className="text-gray-600 text-lg">{event.eventDate}</p>
                        <p className="bg-green-100 text-green-800 py-1 px-3 rounded-full text-sm">{event.eventCategory}</p>
                    </div>

                    <p className="text-gray-700 mt-6 text-lg leading-relaxed">
                        {event.eventDescription}
                    </p>

                    <div className="mt-6">
                        <h3 className="text-xl font-semibold text-gray-800">Location:</h3>
                        <p className="text-gray-700">{event.eventLocation}</p>
                    </div>

                    <div className="mt-8">
                        {(authenticated && !registered)?(
                            <button onClick={registerToEvent} className="bg-blue-600 text-white py-2 px-6 rounded-lg text-xl hover:bg-blue-700 transition duration-300">Register Now</button>
                        ):""}

                        {registered?(
                            <button onClick={unregisterToEvent} className="bg-gray-600 text-white py-2 px-6 rounded-lg text-xl">UnRegister</button>
                        ):""}

                        {(message)?(
                            <p className="text-green-500">{message}</p>
                        ):""}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Event;
