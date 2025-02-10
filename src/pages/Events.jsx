import React, {useEffect, useState, useContext} from 'react';
import {Link} from 'react-router-dom';
import Layout from './../components/Layout';
import EventCard from './../components/EventCard';

import AuthContext from './../providers/AuthContext';

import axios from 'axios';

const Events = ()=>{

    const API_URL = import.meta.env.VITE_API_URL;

    const [events, setEvents] = useState([]);
    const [category, setCategory] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    
    const {user, authenticated, isLoading} = useContext(AuthContext);

    useEffect(()=>{
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const params = {};
            if (category) params.category = category;
            if (startDate && endDate) {
                params.startDate = startDate;
                params.endDate = endDate;
            }

            const res = await axios.get(API_URL+"/api/getEvents", { params });
            setEvents(res.data);
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    };

    return (
        <Layout>
            <main className="mt-12 px-4">
                <div className="flex justify-between item-center w-full">
                    <h1 className="text-2xl"> Events </h1>

                    {(user?.role === "admin")? (
                        <Link to="/event/create" className="text-white bg-[#2ec4b6] py-2 px-2 rounded-xl">Create Event</Link>
                    ):""}
                </div>

                <div className="w-fit flex sm:flex-row gap-4 mb-6">
                    <select value={category} onChange={(e) => setCategory(e.target.value)} className="p-2 border rounded">
                        <option value="">All Categories</option>
                        <option value="Music">Music</option>
                        <option value="Sports">Sports</option>
                        <option value="Tech">Tech</option>
                    </select>
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="p-2 border rounded"/>
                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="p-2 border rounded"/>
                    <button onClick={fetchEvents} className="bg-[#2a9d8f] text-white px-4 py-2 rounded">
                        Filter
                    </button>
                </div>

                <div className="eventListResponsive flex flex-wrap my-4 gap-4">
                    {events.map((event, index)=>{
                        return <EventCard event={event} key={index} />
                    })}
                </div>
            </main>
        </Layout>
    );
}

export default Events;
