import React, { useReducer } from 'react';
import axios from 'axios';
import EventContext from './eventContext';
import EventReducer from './eventReducer';

import {
    GET_ALL_EVENTS,
    GET_USER_EVENTS,
    ADD_EVENT,
    DELETE_EVENT,
    UPDATE_EVENT,
    FILTER_EVENTS,
    CLEAR_FILTER,
    CLEAR_EVENTS,
    SET_CURRENT,
    CLEAR_CURRENT,  
    EVENT_ERROR
} from '../types';

const EventState = (props) => { 

    const initialState = {
        userEvents: null,
        allEvents: null,
        current: null,
        filtered: null,
        error: null,
        token: localStorage.getItem('token')
    }

    const [state , dispatch] = useReducer(EventReducer , initialState);

    const getAllEvents = async () => {

        try {
            const res = await axios.get('/api/v1/events');
            dispatch({ type:GET_ALL_EVENTS , payload:res.data });
        } catch (error) {
            dispatch({
                type: EVENT_ERROR,
                payload: error.response.msg
            }) 
        }

    }

    const getUserEvents = async () => {

        try {
            const res = await axios.get('/api/v1/events/user');
            dispatch({ type:GET_USER_EVENTS, payload:res.data });
        } catch (error) {
            dispatch({
                type: EVENT_ERROR,
                payload: error.response.msg
            }) 
        }
    }

    const addEvent = async (event) => {
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }
        try {
            const res= await axios.post('/api/v1/events', event, config);
             //not sending token locally bcoz it is set globallt hrough our setAuthToken file.

            dispatch({
                    type: ADD_EVENT,
                    payload: res.data
                }) 
            
        } catch (error) {
            dispatch({
                    type: EVENT_ERROR,
                    payload: error.response.msg
                }) 
        }
       
    }

    const deleteEvent = async (id) => {
        
        try {
            let res = await axios.delete(`/api/v1/events/${id}`);
            
            dispatch({
                type: DELETE_EVENT,
                payload: id
            })

            return res;
        }
        catch (error) {
            dispatch({
                type: EVENT_ERROR,
                payload: error.response.msg
            }) 
            return error.response.msg;
        }
        
    }

    const updateEvent = async (event) => {

     
        try {

            const config = {
                headers: {
                    'Content-Type' : 'application/json'
                }
            }

            const res= await axios.patch(`/api/v1/events/${event._id}`, event , config);

            dispatch({
                    type: UPDATE_EVENT,
                    payload: res.data.event
                }) 
            
        } catch (error) {

            console.log(error);
            dispatch({
                    type: EVENT_ERROR,
                    payload: error.response.msg
                }) 
        }
    }

    



    const clearEvents = () => {
        dispatch({ type: CLEAR_EVENTS })
    }

    const setCurrent = (event) => {
        dispatch({type:SET_CURRENT , payload:event})
    }
    
    const clearCurrent = () => {
        dispatch({type:CLEAR_CURRENT})
    }

    const filterEvent = (text) => {
        dispatch({type:FILTER_EVENTS , payload:text})
    }

    const clearFilter = () => {
        dispatch({type:CLEAR_FILTER  })
    }


    return (
        <EventContext.Provider
            value={{
                allEvents: state.allEvents,
                userEvents: state.userEvents,
                current: state.current,
                filtered: state.filtered,
                error: state.error,
                getAllEvents,
                getUserEvents,
                addEvent,
                deleteEvent,
                clearEvents,
                setCurrent,
                clearCurrent,
                updateEvent,
                filterEvent,
                clearFilter
            }}
        >
            {props.children}    
        </EventContext.Provider> 
    );
}   

export default EventState;




// Use Reducer
// An alternative to useState.

// useReducer is usually preferable to useState when you have complex state logic that involves multiple sub - values.
// or when the next state depends on the previous one.
// It also lets you optimize performance for components that trigger deep updates because you can pass dispatch down instead of callbacks.