import {Link} from 'react-router-dom';

const EventCard = (props)=>{

    const eventTime = ()=>{
        const d1 = new Date(props.event.eventDate);
        const d2 = new Date();
        
        // 1 = upcoming
        // 0 = today
        // -1 = ended 
        if(d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth() && d1.getYear() === d2.getYear()){
            return 0;
        }

        if(d2 < d1){
            return 1;
        }

        return -1;
    }

    const getEventTimeText = ()=>{
        switch(eventTime()){
            case 1:
                return {text: "Upcoming", css: "bg-blue-200 text-blue-800"};
            case 0:
                return {text: "Today", css: "bg-green-100 text-green-800"};
            case -1:
                return {text: "Ended", css: "bg-red-300 text-red-500"};
        }
    }

    return (
        <div className="md:max-w-xs w-full rounded-lg overflow-hidden shadow-lg bg-white">
            <img className="w-full h-48 object-cover" src={props.event.eventBannerUrl} alt="Event Image"/>
          <div className="px-6 py-4">
             <div className="flex justify-between py-2">
                <h2 className="text-xl font-semibold text-gray-800" id="event_name">{props.event.eventName}</h2>
                <p className={getEventTimeText().css+" w-fit float-right py-1 px-3 rounded-full text-sm"}>{getEventTimeText().text}</p>

            </div>
            <p className="w-fit float-right bg-green-100 text-green-800 py-1 px-3 rounded-full text-sm">{props.event.eventCategory}</p>
            <p className="text-gray-600 mt-2" id="event_description">{props.event.eventDescription}</p>
            <p className="text-gray-500 mt-4" id="event_date">Event Date: {new Date(props.event.eventDate).toDateString()}</p>
          </div>
          <div className="px-6 py-2 bg-gray-100">
              <Link to={"/event/"+props.event._id} className="text-blue-500 hover:underline">More Details</Link>
          </div>
        </div>
    );
}

export default EventCard;
