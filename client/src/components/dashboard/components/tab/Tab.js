import React from 'react';
import './Tab.css'
import { NavLink } from "react-router-dom";

function Tab({ routes }) {
    console.log(routes);
    return (
        <div className="tab">
            {routes?.map(route => (
                <NavLink to={"/dashboard/" + route.path} key={route.id} activeClassName='is-active-tab' className="tab__menu">
                    <p >{route.name}</p>
                </NavLink>
            ))}
        </div>
    )
}

export default Tab
