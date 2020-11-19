import React, {useEffect, useState, useContext } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const Login = (props) => {
    
    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext;
    
    const authContext = useContext(AuthContext);
    const { login,error,clearErrors ,isAuthenticated } = authContext;

    const [user, setuser] = useState({
        email: '',
        password: '',
    })

    useEffect(() => {

        if (isAuthenticated) {
            props.history.push('/');
        }
        if (error) {
            setAlert(error, 'danger');
            clearErrors();
        }
    },[isAuthenticated , error, props.history ])
    
    const onChange = (e) => {

        setuser({...user , [e.target.name]: e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        
        if (email === '' || password === '' ) {
            setAlert('Please enter all fields', 'danger');
            return;
        }

        login(user);
    }

    const {email, password } = user;

    return (
        <div className='form-container'>
            <h1>
                Account <span className="text-primary">Login</span>
            </h1>
            <form onSubmit={onSubmit}>
                

                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" name='email' value={email} placeholder='Email' onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' value={password} placeholder='Password' onChange={onChange} />
                </div>
                
                <input type="submit" value="Login" className="btn btn-primary btn-block"/>
            </form>
        </div>
    )
}

export default Login;
