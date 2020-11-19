import React,{useContext,useEffect} from 'react'
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const PrivateRoute = ({ component: Component, ...rest }) => {

    const authContext = useContext(AuthContext);
    const { isAuthenticated, loading ,loadUser } = authContext;

    // console.log(!loading);

    useEffect(() => {
        loadUser();
    }, [] )
    
    return (
        <Route
            {...rest}
            render={
                (props) => (!isAuthenticated && !loading) ? ( <Redirect to='/login' />) 
                : ( <Component {...props} />)
            } 
        />
    )
}

export default PrivateRoute;