import React,{useEffect,useState,useContext} from 'react';

function About(){
    
    return (
        <div>
            <h1>About This App</h1>
            <p className="my-1">
                This is a full stack app for listing Events
            </p>
            <p className="bg-dark p">
                <strong>Version: </strong>1.0.0
            </p>
        </div>
        
    );
}

export default About;