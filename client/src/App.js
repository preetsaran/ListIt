import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Components/pages/Home';
import About from './Components/pages/About';
import Profile from './Components/pages/Profile';
import Navbar from './Components/layouts/Navbar';
import Alerts from './Components/layouts/Alerts';
import Register from './Components/auth/register';
import Login from './Components/auth/login';
import EventState from './context/event/eventState';
import AuthState from './context/auth/authState';
import AlertState from './context/alert/alertState';
import setAuthToken from './utilities/setAuthToken';
import PrivateRoute from './Components/routing/PrivateRoute';



setAuthToken(localStorage.token);


const App = () => {
  return (
    <AuthState>
      <EventState>
        <AlertState>
          <Router>
            <React.Fragment>
              <Navbar></Navbar>
              <div className="contaner" style={{ margin: "5rem", marginTop: "1rem" }}>
                <Alerts/>
                <Switch>
                  <Route exact path='/'  component={Home}/>
                  <Route exact path='/about' component={About}/>
                  <Route exact path='/login' component={Login}/>
                  <Route exact path='/register' component={Register}/>
                  <PrivateRoute exact path='/profile' component={Profile}/>
                </Switch>
              </div>
            </React.Fragment>
          </Router>
        </AlertState>
      </EventState>
    </AuthState>
  );
} 

export default App;
