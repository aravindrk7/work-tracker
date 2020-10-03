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
import HeaderContext from './../../context/headerContext';
import axios from 'axios';
import { config } from './../../constants';
import Tab from './../shared/tab/Tab';

function App() {
  const api_url = config.url.API_URL;
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  });
  const [headerData, setHeaderData] = useState({
    token: undefined,
    user: undefined
  });

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
      else {
        setUserData({
          token: null,
          user: null
        });
      }
    }
    checkLoggedIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tabItems = [
    {
      parent: "/dashboard/",
      path: 'overall',
      name: 'Overall',
      icon: 'DashboardIcon',
      id: 1
    },
    {
      parent: "/dashboard/",
      path: 'photoshop',
      name: 'Photoshop',
      icon: 'CameraEnhanceIcon',
      id: 2
    },
    {
      parent: "/dashboard/",
      path: 'web-dev',
      name: 'Web Dev',
      icon: 'LanguageIcon',
      id: 3
    },
    {
      parent: "/",
      path: 'settings',
      name: 'Manage Project',
      icon: 'SettingsIcon',
      id: 4
    }
  ];

  return (
    <Router>
      <UserContext.Provider value={{ userData, setUserData }}>
        <HeaderContext.Provider value={{ headerData, setHeaderData }}>
          <div className="app">
            <Header />
            {userData.user &&
              <Tab routes={tabItems} />
            }
            <div className="app__main">

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

          </div>
        </HeaderContext.Provider>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
