import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import Tab from './../shared/tab/Tab';
import Overall from './components/main/Main';
import NoMatch from '../noMatch/NoMatch';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { config } from './../../constants';
import axios from 'axios';

function Dashboard() {
    const api_url = config.url.API_URL;
    const [works, setWorks] = useState({});
    const [photoshopWorks, setPhotoshopWorks] = useState({});
    const [webWorks, setWebWorks] = useState({});
    useEffect(() => {
        axios.get(api_url + 'dashboard/all')
            .then(response => {
                setWorks(response.data);
            });
        axios.get(api_url + 'dashboard/photoshop')
            .then(response => {
                setPhotoshopWorks(response.data);
            });
        axios.get(api_url + 'dashboard/webDevelopment')
            .then(response => {
                setWebWorks(response.data);
            });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const parent = "/dashboard/";
    const tabItems = [
        {
            path: 'overall',
            name: 'Overall',
            id: 1
        },
        {
            path: 'photoshop',
            name: 'Photoshop',
            id: 2
        },
        {
            path: 'web-dev',
            name: 'Web Development',
            id: 3
        }
    ]

    return (
        <Router>
            <div className="dashboard">
                <Tab routes={tabItems} parent={parent} />
                <Switch>
                    <Route exact path="/dashboard/">
                        <Redirect to="/dashboard/overall" />
                    </Route>
                    <Route exact path="/dashboard/overall">
                        <Overall works={works} />
                    </Route>
                    <Route exact path="/dashboard/photoshop">
                        < Overall works={photoshopWorks} />
                    </Route>
                    <Route exact path="/dashboard/web-dev">
                        <Overall works={webWorks} />
                    </Route>
                    <Route path="*">
                        <NoMatch />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

export default Dashboard;
