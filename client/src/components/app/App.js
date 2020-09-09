import React from 'react';
import './App.css';
import Header from '../header/Header';
import Dashboard from '../dashboard/Dashboard';
import Settings from '../settings/Settings';
import NoMatch from '../noMatch/NoMatch';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
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
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>

      </div>
    </Router>
  );
}

export default App;
