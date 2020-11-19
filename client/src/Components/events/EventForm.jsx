import React,{useState,useContext,useEffect} from 'react'
import EventContext from '../../context/event/eventContext'  

const EventForm = () => {
    const [event, setEvent] = useState({
        eventName: '',
        eventType: 'Personal',
        location: '',
        date: ''
    })

    const eventContext = useContext(EventContext);
    const { addEvent, current , clearCurrent ,updateEvent} = eventContext;
    
    
    useEffect(() => {
        
        if (current !== null) {
            setEvent(current)
        }
        else {
            setEvent({
                eventName: '',
                eventType: 'Personal',
                location: '',
                date: ''
            })
        }
       
    }, [current , eventContext] )

    const onChange = (e) => {
        setEvent({ ...event, [e.target.name]: e.target.value })
    }

    const onSubmit = (e) => {

        e.preventDefault();

        if (current) {
            updateEvent(event);
        }
        else {
            addEvent(event);
        }
        
        clearCurrent();

    }

    const { eventName, eventType, location, date } = event;

    return (

        <form onSubmit={onSubmit} style={{ width: "30rem" }}>

            <h2 className="text-primary">{current ? 'Update ' : 'Add '} event</h2>
            
            <input type="text" placeholder="Name" name="eventName" value={eventName}
                onChange={onChange} />
            <input type="text" placeholder="Location" name="location" value={location}
                onChange={onChange} />
            <input type="date" placeholder="Date" name="date" value={date} onChange={onChange} />
            
            <h5>Event type</h5>
            <input type="radio" name="eventType" value="Personal" checked={eventType === 'Personal'}
                onChange={onChange} /> Personal{' '}
            <input type="radio" name="eventType" value="Professional" checked={eventType === 'Professional'}
                onChange={onChange} /> Professional
            <input type="submit" value={`${current ? 'Update ' : 'Add '} event`} className="btn btn-primary btn-block" />
            
                {current && (<div>
                <button className="btn btn-light btn-block" onClick={clearCurrent}>Clear</button>
            </div>)}

        </form>
         
    )
}

export default EventForm;