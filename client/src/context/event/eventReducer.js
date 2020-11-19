import {
    GET_ALL_EVENTS,
    GET_USER_EVENTS,
    ADD_EVENT,
    DELETE_EVENT,
    UPDATE_EVENT,
    CLEAR_EVENTS,
    FILTER_EVENTS,
    CLEAR_FILTER,
    SET_CURRENT,
    CLEAR_CURRENT,
    EVENT_ERROR
} from '../types';

const EventReducer = (state, action) => {

    switch (action.type) {

        case GET_ALL_EVENTS:
            return {
                ...state,
                allEvents: action.payload,
                    loading: false
            }
            break;

        case GET_USER_EVENTS:
            return {
                ...state,
                userEvents: action.payload,
                    loading: false
            }
            break;



        case ADD_EVENT:
            return {
                ...state,
                userEvents: [action.payload, ...state.userEvents],
                    loading: false
            }
            break;

        case UPDATE_EVENT:
            return {
                ...state,
                userEvents: state.userEvents.map((event) => {
                        return event._id === action.payload._id ? action.payload : event
                    }),
                    loading: false
            }
            break;

        case DELETE_EVENT:
            return {
                ...state,
                userEvents: state.userEvents.filter((event) => {
                        return event._id !== action.payload
                    }),
                    loading: false
            }

            case CLEAR_EVENTS:
                return {
                    ...state,
                    userEvents: null,
                        allEvents: null,
                        current: null,
                        error: null,
                }
                break;

            case SET_CURRENT:
                return {
                    ...state,
                    current: action.payload
                }
                break;

            case CLEAR_CURRENT:
                return {
                    ...state,
                    current: null
                }
                break;

            case FILTER_EVENTS:
                return {
                    ...state,
                    filtered: state.allEvents.filter((event) => {
                        const regex = new RegExp(`${action.payload}`, 'gi')
                        return event.eventName.match(regex) || event.location.match(regex)
                    })
                }
                break;

            case CLEAR_FILTER:
                return {
                    ...state,
                    filtered: null
                }
                break;

            case EVENT_ERROR:
                return {
                    ...state,
                    error: action.payload,
                        loading: false
                }
                break;

            default:
                return state;
    }
}

export default EventReducer;