import React, { useState, useEffect } from 'react';
import './App.css';
import Header from '../header/Header';
import Dashboard from '../dashboard/Dashboard';
import Settings from '../settings/Settings';
import NoMatch from '../noMatch/NoMatch';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Login from '../login/Login';
import Register from '../register/Register';
import UserContext from './../../context/userContext';
import axios from 'axios';
import { config } from './../../constants';

function App() {
  const api_url = config.url.API_URL;
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  });

  console.log();

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await axios.post(
        api_url + 'user/isValidToken',
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenRes.data) {
        const userRes = await axios.get(
          api_url + 'user/currentUser',
          { headers: { "x-auth-token": token } }
        );
        setUserData({
          token,
          user: userRes.data
        });
      }
    }
    checkLoggedIn();
  }, []);


  return (
    <Router>
      <UserContext.Provider value={{ userData, setUserData }}>
        <div className="app">
          <Header />
          <Switch>
            <Route exact path="/">
              <Redirect to="/dashboard" />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/settings">
              <Settings />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
        </div>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
