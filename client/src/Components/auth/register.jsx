import React,{useState,useContext,useEffect} from 'react'
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const Register = (props) => {
    
    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext;

    const authContext = useContext(AuthContext);
    const { register,error,clearErrors ,isAuthenticated } = authContext;

    useEffect(() => {

        if (isAuthenticated) {
            props.history.push('/');
        }

        if (error) {
            setAlert(error, 'danger');
            clearErrors();
        }

    }, [isAuthenticated, error, props.history] );
     
    
    const [user, setuser] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword:''
    })

    const { name , email , password , confirmPassword } = user;
    
    const onChange = (e) => {   
        setuser({...user , [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        if (name === '' || password === '' || confirmPassword === '' || email === '') {
            setAlert('Please enter all fields', 'danger');
        }
        else if(password !== confirmPassword){
            setAlert('Password do not match', 'danger');
        }
        else {

            await register({ name, email, password });
            
            // if (res.err ) {
            //     console.log(res.err);
            // }
            // else if( res.res && res.res.status === 200){
            //     setAlert('User Registered', 'success');
            //     setuser({name: '',
            //     email: '',
            //     password: '',
            //     confirmPassword:''});
            // }
            
        }
    }



    return (
        <div className='form-container'>
            <h1>
                Account <span className="text-primary">Register</span>
            </h1>
            <form onSubmit={onSubmit}>
                
                <div className="form-group">
                    <label htmlFor="email">Name</label>
                    <input type="text" name='name' value={name} placeholder='Name' onChange={onChange}/>
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" name='email' value={email} placeholder='email' onChange={onChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' value={password} placeholder='password' onChange={onChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" name='confirmPassword' value={confirmPassword} placeholder='Confirm Password' onChange={onChange}/>
                </div>

                <input type="submit" value="Register" className="btn btn-primary btn-block"/>
            </form>
        </div>
    )
}

export default Register;
