import {useState, useEffect, useContext} from 'react';
import {useParams, useNavigate} from 'react-router-dom';

import Layout from './../components/Layout';

import AuthContext from './../providers/AuthContext';

import axios from 'axios';
import Cookies from 'js-cookie';

const EditEvent = ()=>{
    
    const {user, authenticated, isLoading} = useContext(AuthContext);

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const API_URL = import.meta.env.VITE_API_URL;

    const { slug } = useParams(); 
    
    const [eventName, setEventName] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [eventCategory, setEventCategory] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventLocation, setEventLocation] = useState('');
    const [eventBanner, setEventBanner] = useState(null);
    const [eventBannerUrl, setEventBannerUrl] = useState(null);

    const [message, setMessage] = useState('');
    const [error, setError] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setEventBannerUrl(URL.createObjectURL(file));
            setEventBanner(file);
        }
    };

    const handleSubmit = async (event)=>{
        event.preventDefault();

        const formData = new FormData();
        formData.append("event_name", eventName);
        formData.append("event_description", eventDescription);
        formData.append("event_category", eventCategory);
        formData.append("event_date", eventDate);
        formData.append("event_location", eventLocation);
        formData.append("event_banner", eventBanner); 

        const token = Cookies.get("token");


        try {

            setLoading(true);
            const res = await axios.put(API_URL+"/api/editEvent/"+slug, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                     Authorization: `Bearer ${token}`
                },
            });

            if(res.data){
                setMessage(res.data.message);
            }

            setLoading(false);

        } catch (error) {
            console.error("Error creating event:", error);
            setError(true);
            setMessage(error.response.data.error);
        }


    }

    useEffect(()=>{

        fetchEvent();

        if(!isLoading && !authenticated && !(user?.role === "admin")){
           navigate("/events");
        }
    }, [isLoading]);


    const fetchEvent = async()=>{
        try{
            const res = await axios.get(API_URL+"/api/getEvent/"+slug, {
            });

            if(res.data){
                setEventName(res.data.eventName);
                setEventDescription(res.data.eventDescription);
                setEventCategory(res.data.eventCategory);

                const dateTime = new Date(res.data.eventDate);
                setEventDate(dateTime.toISOString().slice(0, 16));

                setEventLocation(res.data.eventLocation);
                setEventBannerUrl(res.data.eventBannerUrl);
            }

        } catch (error) {
            console.error("Error fetching events:", error);
        }
    }



    if(isLoading){
        return (
            <>
                <p>Loading</p>
            </>
        );
    }

    return (
        <Layout>
            <div className="max-w-2xl bg-white mx-auto mt-12 p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-6">Create New Event</h2>

                 <form onSubmit={handleSubmit} className="space-y-4">
                       {message?(
                           <p className={error?"text-red-500":"text-green-500"}>{message}</p>
                       ):""}
                       <div className="space-y-2">
                           <label htmlFor="event-name" className="block text-lg font-medium text-gray-700">Event Name</label>
                           <input 
                               type="text" 
                               id="event-name" 
                               name="event_name" 
                               value={eventName} 
                               onChange={(e) => setEventName(e.target.value)} 
                               required 
                               className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                               placeholder="Enter event name" 
                           />
                       </div>

                       <div className="space-y-2">
                           <label htmlFor="event-description" className="block text-lg font-medium text-gray-700">Event Description</label>
                           <textarea 
                               id="event-description" 
                               name="event_description" 
                               value={eventDescription} 
                               onChange={(e) => setEventDescription(e.target.value)} 
                               rows="4" 
                               required 
                               className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                               placeholder="Enter event description" 
                           />
                       </div>

                       <div className="space-y-2">
                           <label htmlFor="event-date" className="block text-lg font-medium text-gray-700">Event Date</label>
                           <input 
                               type="datetime-local" 
                               id="event-date" 
                               name="event_date" 
                               value={eventDate} 
                               onChange={(e) => setEventDate(e.target.value)} 
                               required 
                               className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                           />
                       </div>

                       <div className="space-y-2">
                           <label htmlFor="category" className="block text-lg font-medium text-gray-700">Category</label>

                        <select value={eventCategory} onChange={(e) => setEventCategory(e.target.value)} className="p-2 border rounded">
                            <option value="">All Categories</option>
                            <option value="Music">Music</option>
                            <option value="Sports">Sports</option>
                            <option value="Tech">Tech</option>
                        </select>
                       </div>

                       <div className="space-y-2">
                           <label htmlFor="event-location" className="block text-lg font-medium text-gray-700">Event Location</label>
                           <input 
                               type="text" 
                               id="event-location" 
                               name="event_location" 
                               value={eventLocation} 
                               onChange={(e) => setEventLocation(e.target.value)} 
                               required 
                               className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                               placeholder="Enter event location" 
                           />
                       </div>

                       <div className="space-y-2">
                           <label htmlFor="event-banner" className="block text-lg font-medium text-gray-700">Event Banner</label>
                           <input 
                               type="file" 
                               id="event-banner" 
                               accept="image/*" 
                               onChange={handleImageChange} 
                               className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                           />
                           {eventBannerUrl && (
                               <img src={eventBannerUrl} alt="Event Banner Preview" className="mt-2 w-full h-40 object-cover rounded-md" />
                           )}
                       </div>

                               <div className="flex items-center justify-between">
                           <button type="submit" className="w-full sm:w-auto bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                               {loading?("Wait..."):"Edit Event"}
                               
                           </button>
                            
                       </div>
               </form>
            </div>
        </Layout>
    );
}

export default EditEvent;
