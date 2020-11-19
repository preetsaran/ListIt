import React, { useState,useContext , Fragment ,useEffect}from 'react'
import EventContext from '../../context/event/eventContext';
import EventItem from './EventItem'
import { CSSTransition,TransitionGroup} from 'react-transition-group';
import Spinner from '../layouts/spinner';

const Events = ({page}) => {
  
    const eventContext = useContext(EventContext);
    let { allEvents, userEvents, filtered, getAllEvents, getUserEvents , loading} = eventContext;


    useEffect(() => {
        if (page === 'Home')
        getAllEvents();
        else if (page === 'Profile') 
        getUserEvents()
    }, [] )
    
    
    let npage = (page === 'Home') ? 'Home' : 'Profile';
    
    let events = (page === 'Home') ? allEvents : userEvents;
        
    return (

        <Fragment >
            
            {events !== null  &&  !loading ? (<TransitionGroup
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gridGap:'2rem'
                }}
            >
            { filtered ? filtered.map((event) => {
                return (
                    <CSSTransition key={event._id} timeout={500} classNames="item">
                    <EventItem
                            event={event}
                            page={npage}>           
                        </EventItem>
                    </CSSTransition>)
            }) :
            events.map((event) => {
                return (
                    <CSSTransition key={event._id} timeout={500} classNames="item">
                        <EventItem
                            event={event}
                            page={npage}>
                        </EventItem>
                    </CSSTransition>)
            })}
            </TransitionGroup>) : <Spinner/>}
            
        </Fragment>
    )
}

export default Events; 