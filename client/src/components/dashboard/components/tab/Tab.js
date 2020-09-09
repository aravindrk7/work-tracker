import React from 'react';
import './Tab.css'
import { NavLink } from "react-router-dom";

function Tab() {
    return (
        <div className="tab">
            <NavLink to="/dashboard/overall" activeClassName='is-active-tab' className="tab__menu">
                <p >Overall</p>
            </NavLink>
            <NavLink to="/dashboard/photoshop" activeClassName='is-active-tab' className="tab__menu">
                <p >Photoshop</p>
            </NavLink>
            <NavLink to="/dashboard/web-dev" activeClassName='is-active-tab' className="tab__menu">
                <p >Web Development</p>
            </NavLink>
        </div>
    )
}

export default Tab
