import React from 'react';
import './Tab.css'
import { NavLink } from "react-router-dom";
import SettingsIcon from '@material-ui/icons/Settings';
import LanguageIcon from '@material-ui/icons/Language';
import CameraEnhanceIcon from '@material-ui/icons/CameraEnhance';
import DashboardIcon from '@material-ui/icons/Dashboard';
import logo from './../../../images/logo.png';

function Tab({ routes, parent }) {
    // const MaterialIcon = ({ icon }) => {
    //     let iconName = icon.replace(/Icon$/, '');
    //     let resolved = require(`@material-ui/icons/${iconName}`).default;

    //     if (!resolved) {
    //         throw Error(`Could not find material-ui-icons/${iconName}`);
    //     }

    //     return React.createElement(resolved);
    // }

    const icons = {
        DashboardIcon: <DashboardIcon />,
        CameraEnhanceIcon: <CameraEnhanceIcon />,
        LanguageIcon: <LanguageIcon />,
        SettingsIcon: <SettingsIcon />,
    };

    const getIcon = (name) => {
        return icons[name];
    };

    return (
        <div className="tab">
            <div className="tab__logo">
                <img className="tab__logoImage" src={logo} alt="" />
                <p>Work Tracker</p>
            </div>
            <div className="tab__logo--small">
                <img className="tab__logoImage" src={logo} alt="" />
            </div>
            {routes?.map(route => (
                <NavLink to={route.parent + route.path} key={route.id} title={route.name} activeClassName='is-active-tab' className="tab__menu">
                    <div className="tab__icon">
                        {getIcon(route.icon)}
                        {/* <MaterialIcon icon={route.icon} /> */}
                    </div>
                    <div className="tab__name">
                        <p >{route.name}</p>
                    </div>
                </NavLink>
            ))}
        </div>
    )
}

export default Tab
