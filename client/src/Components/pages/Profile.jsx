import React,{useEffect,useState,useContext} from 'react';
import Events from '../events/Events';
import EventForm from '../events/EventForm';
import AuthContext from '../../context/auth/authContext';

function Profile() {

  const authContext = useContext(AuthContext);
  
  useEffect(() => {
    if(localStorage.token)
    authContext.loadUser();
  }, [] )


  return (
     
    <div className="grid-2" style={{ display: "flex", flexDirection: "column" ,margin: "2rem" }} >
        
        <div style={{ display: "flex" }}> 
            
          <EventForm />
            
          <div style={{ display: "flex", flexDirection: "column" }} >
            <h2 style={{marginLeft: "14.7rem" , color: `var(--primary-color)` }}>Get Your Event Listed</h2>
            <img src="./calendar.png" alt="" style={{ height: "40vh", width: '25vw', marginLeft: "15rem" }} />
          </div>
          
        </div>
          
      <Events
       page={'Profile'}/>
              
    </div>  
      
    );
}

export default Profile;