import React from 'react';
import './Tab.css'
import { NavLink } from "react-router-dom";
// import CameraEnhanceIcon from '@material-ui/icons/CameraEnhance';
// import LanguageIcon from '@material-ui/icons/Language';

function Tab({ routes, parent }) {
    const MaterialIcon = ({ icon }) => {
        let iconName = icon.replace(/Icon$/, '');
        let resolved = require(`@material-ui/icons/${iconName}`).default;

        if (!resolved) {
            throw Error(`Could not find material-ui-icons/${iconName}`);
        }

        return React.createElement(resolved);
    }
    return (
        <div className="tab">
            <div className="tab__logo">
                WT
            </div>
            {routes?.map(route => (
                <NavLink to={parent + route.path} key={route.id} title={route.name} activeClassName='is-active-tab' className="tab__menu">
                    <div className="tab__icon">
                        <MaterialIcon icon={route.icon} />
                    </div>
                    {/* <p >{route.name}</p> */}
                </NavLink>
            ))}
        </div>
    )
}

export default Tab
