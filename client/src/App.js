import React from 'react';
import axios from 'axios'
import './App.css';
import Login from "./components/Login";
import Register from "./components/Register"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import Header from './components/Header';
import Main from './components/Main'
import Edit from './components/Edit-profile'
import ProviderAppointments from './components/providers/ProviedAppointments'
import ClientAppointments from './components/clients/ClientAppointments'
import Calendar from './components/clients/Calendar'
import ClientHome from './components/clients/ClientHome'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"



function App() {
  const [userType, setUserType] = useState('client')

  // const setUserTypeFunction = (type) => {
  //   setUserType(prev => (type);
  // }
  // send the login information to the backend
  const submitlogin = (email, password) => {

    const data = {
      email: email,
      password: password
    }
    axios.post('/api/clients/login', data)
      .then((response) => {
        console.log('submit login fn')
        console.log(response)
      }).catch((err) => {
        console.log(err)
      })

  }
  //create a new account 
  const submitRegister = (first_name, last_name, email, password, phone_number, address) => {
    const data = {
      first_name,
      last_name,
      email,
      password,
      phone_number,
      address
    }
    axios.post('/api/clients', data)
      .then((response) => {
        console.log('submit login fn')
        console.log(response)
      }).catch((err) => {
        console.log(err)
      })

  }
  const userId = 2;
  //get all the appointments
  axios.get(`/api/clients/${userId}/appointments`)

    .then(response => {
      console.log(response.data)
      console.log("hello")
    }).catch((err) => {
      console.log(err)
    })


  return (

    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">main</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/edit-profile">profile</Link>
            </li>
            <li>
              <Link to="/appointments">Appointments</Link>
            </li>
            <li>
              <Link to="/clientHome">Client Home</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/login">
            <Login
              submitlogin={submitlogin} />
          </Route>
          <Route path="/register">
            <Register
              submitRegister={submitRegister} />
          </Route>
          <Route path="/edit-profile">
            <Header />
            <Edit />
          </Route>
          <Route path="/appointments">
            <Header />
            {userType === 'client' && <ClientAppointments />}
            {userType === 'provider' && <ProviderAppointments />}
          </Route>
          <Route path="/clientHome">
            <Header />
            <ClientHome />
          </Route>
          <Route path="/">
            <Main setUserType={setUserType} />
          </Route>
        </Switch>
      </div>

    </Router>

  );

}

export default App;
