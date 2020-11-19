import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import EventContext from '../../context/event/eventContext';
import AlertContext from '../../context/alert/alertContext';

const EventItem = ({ event , page }) => {

    const { eventName, eventType, location, date , _id } = event;
    const eventContext = useContext(EventContext);
    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext;
    const { deleteEvent , setCurrent , clearCurrent } = eventContext;

    const handleDelete = async () => {
        
        let res = await deleteEvent(_id);

        if(res.data.msg)
            setAlert(res.data.msg, 'success');
        else
            setAlert(res, 'danger');
        
        clearCurrent();
        
    }

    const handleEdit = () => {
        setCurrent(event);
    }

    return (
        
        <div className='card bg-light'  style={{width: '20vw',height: '25vh'}} >
            <h3 className="text-primary text-left">
                {eventName}{' '}
                <span style={{float:'right'}}
                    className=
                    {'badge ' +
                    (eventType == 'Professional' ? 'badge-success' : 'badge-primary')}>
                    {event.eventType.charAt(0).toUpperCase() + eventType.slice(1)} 
                </span>
            </h3>   
            <ul className="list">
                {location && (<li>
                    <i className="fa fa-map-marker"  style={{marginRight:"10px"}}></i>{location}
                </li>)}
                    
                {date && (<li>
                    <i className="fa fa-calendar" style={{marginRight:"5px"}}></i>{date.split('T')[0]}
                </li>)}

            </ul>
           
            { page === 'Profile' &&
                (<p>
                    <button className="btn btn-dark btn-sm" onClick={handleEdit}>Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={handleDelete}>Delete</button>
                </p>)
            }

            
            
        </div>
        
    ) 
}

EventItem.propTypes = {
    event:PropTypes.object.isRequired
}
export default EventItem;