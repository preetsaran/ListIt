import React ,{useContext}  from 'react'
import PropTypes from 'prop-types';
import AuthContext from '../../context/auth/authContext';
import EventContext from '../../context/event/eventContext';
import {Link} from 'react-router-dom'

const Navbar = ({ title , icon }) => {
    
    const authContext = useContext(AuthContext);
    const { isAuthenticated, logout } = authContext;
    
    const eventContext = useContext(EventContext);
    const { clearEvents } = eventContext;

    const LogOut = () => {
        logout();
        clearEvents();
    }
    
    const authLinks = ( 
        <React.Fragment>
            <Link to='/profile'> My Profile </Link> 
            <Link className='fa fa-sign-out' style={{marginTop:"5px"}} to='/' onClick={LogOut}>  Logout</Link>
        </React.Fragment>
    )

    const guestLinks = (
        <React.Fragment>
            <Link to='/login'> Login </Link>
            <Link to='/register'> Register </Link> 
        </React.Fragment>
    )
    
    return (
        <div className = "navbar bg-primary">
            <h2>
                <i className={icon}/> {title}
            </h2>
            
            <ul>      
            <Link to='/'> Home </Link>
            <Link to='/about'> About </Link> 
                {isAuthenticated  ? authLinks : guestLinks}

            </ul>
        </div>
    )
} 

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon:PropTypes.string
}   

Navbar.defaultProps = {
    title: 'Event List',
    icon:  'fa fa-calendar'
}

export default Navbar;