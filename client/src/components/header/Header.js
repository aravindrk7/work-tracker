import React from 'react'
import './Header.css';
import { NavLink } from "react-router-dom";
import logo from './../../images/logo.png';

function header() {
    return (
        <div className="header">
            <div className="header__heading">
                <NavLink to="/">
                    <img
                        className="header__logo"
                        src={logo}
                        alt="LOGO" />
                    {/* <h1 className="header__name">Work Tracker</h1> */}
                </NavLink>
            </div>
            <div className="header__routes">
                <NavLink to="/dashboard" activeClassName='is-active' className="header__menu">
                    <p >Dashboard</p>
                </NavLink>
                <NavLink to="/settings" activeClassName='is-active' className="header__menu">
                    <p>Settings</p>
                </NavLink>
            </div>
        </div>
    )
}

export default header
