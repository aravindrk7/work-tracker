import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import Tab from './components/tab/Tab';
import Overall from './components/main/Main';
import NoMatch from '../noMatch/NoMatch';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

function Dashboard() {
    const [works, setWorks] = useState([]);
    const [photoshopWorks, setPhotoshopWorks] = useState([]);
    const [webWorks, setWebWorks] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/dashboard')
            .then(response => response.json())
            .then(data => {
                setWorks(data);
            });
        fetch('http://localhost:5000/dashboard/photoshop')
            .then(response => response.json())
            .then(data => {
                setPhotoshopWorks(data);
            });
        fetch('http://localhost:5000/dashboard/webDevelopment')
            .then(response => response.json())
            .then(data => {
                setWebWorks(data);
            });
    }, [])

    const tabItems = [
        {
            path: 'overall',
            name: 'Overall',
            id:1
        },
        {
            path: 'photoshop',
            name: 'Photoshop',
            id:2
        },
        {
            path: 'web-dev',
            name: 'Web Development',
            id:3
        }
    ]

    return (
        <Router>
            <div className="dashboard">
                <Tab routes={tabItems}/>
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
