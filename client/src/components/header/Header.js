import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Header.css';
import { NavLink } from "react-router-dom";
import UserContext from './../../context/userContext';
import HeaderContext from './../../context/headerContext';

function Header() {
    const { userData } = useContext(UserContext);
    const location = useLocation();
    const { headerData } = useContext(HeaderContext);

    const [headerStyle, setHeaderStyle] = useState();
    useEffect(() => {
        if (location.pathname === '/login' || location.pathname === '/register') {
            setHeaderStyle({
                marginLeft: '0px',
                width: '100%'
            });
        }
        else {
            setHeaderStyle({});
        }
    }, [location]);


    return (
        <div className="header" style={headerStyle}>
            <div className="header__heading">
                <p className="header__pageHeading">{headerData.heading}</p>
                <span className="header__pageSubHeading">{headerData.subHeading}</span>
            </div>
            <div className="header__routes">
                {
                    userData.user ?
                        (<>
                            {/* <div className="header__userMenu">
                                <MenuIcon onClick={handleUserSidebar} />
                            </div> */}
                            {/* <NavLink to="/dashboard" activeClassName='is-active' className="header__menu">
                                <p >Dashboard</p>
                            </NavLink>
                            <NavLink to="/settings" activeClassName='is-active' className="header__menu">
                                <p>Settings</p>
                            </NavLink> */}
                            {/* <div className="header__icons">
                                <AccountCircleIcon className="header__icon" />
                                <ArrowDropDownIcon className="header__icon" onClick={toggleDropdown} />
                                {dropdown &&
                                    <div className="header__user">
                                        <p className="header__userItem">{userData.user.displayName}</p>
                                        <p className="header__userItem" onClick={logout}>Logout</p>
                                    </div>
                                }
                            </div> */}
                        </>) :
                        (<>

                            <NavLink to="/login" activeClassName='is-active' className="header__menu">
                                <p>Login</p>
                            </NavLink>
                            <NavLink to="/register" activeClassName='is-active' className="header__menu">
                                <p>Register</p>
                            </NavLink>
                        </>)
                }

            </div>
        </div>
    )
}

export default Header;
