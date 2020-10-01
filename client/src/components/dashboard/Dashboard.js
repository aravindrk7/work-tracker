import React, { useEffect, useState, useContext } from 'react';

import { useHistory } from 'react-router-dom';
import UserContext from './../../context/userContext';
import './Dashboard.css';
// import Tab from './../shared/tab/Tab';
import Main from './components/main/Main';
import NoMatch from '../noMatch/NoMatch';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { config } from './../../constants';
import axios from 'axios';

function Dashboard() {
    const api_url = config.url.API_URL;
    const [works, setWorks] = useState({});
    const [photoshopWorks, setPhotoshopWorks] = useState({});
    const [webWorks, setWebWorks] = useState({});
    const { userData } = useContext(UserContext);
    const history = useHistory();
    useEffect(() => {
        if (typeof userData.user !== 'undefined') {
            if (!userData.user) history.push('/login');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (typeof userData.user !== 'undefined') {

            axios.get(api_url + 'dashboard/all/' + userData.user.email)
                .then(response => {
                    setWorks(response.data);
                });
            axios.get(api_url + 'dashboard/photoshop/' + userData.user.email)
                .then(response => {
                    setPhotoshopWorks(response.data);
                });
            axios.get(api_url + 'dashboard/webDevelopment/' + userData.user.email)
                .then(response => {
                    setWebWorks(response.data);
                });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData.user]);
    // const parent = "/dashboard/";
    // const tabItems = [
    //     {
    //         path: 'overall',
    //         name: 'Overall',
    //         id: 1
    //     },
    //     {
    //         path: 'photoshop',
    //         name: 'Photoshop',
    //         id: 2
    //     },
    //     {
    //         path: 'web-dev',
    //         name: 'Web Development',
    //         id: 3
    //     }
    // ];

    return (
        // <Router>
        <div className="dashboard">
            {/* <Tab routes={tabItems} parent={parent} /> */}
            <Switch>
                <Route exact path="/dashboard/">
                    <Redirect to="/dashboard/overall" />
                </Route>
                <Route exact path="/dashboard/overall">
                    <Main works={works} />
                </Route>
                <Route exact path="/dashboard/photoshop">
                    < Main works={photoshopWorks} />
                </Route>
                <Route exact path="/dashboard/web-dev">
                    <Main works={webWorks} />
                </Route>
                <Route path="*">
                    <NoMatch />
                </Route>
            </Switch>
        </div>
        // </Router>
    )
}

export default Dashboard;
