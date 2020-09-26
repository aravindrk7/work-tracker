import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Header.css';
import { NavLink } from "react-router-dom";
import logo from './../../images/logo.png';
import UserContext from './../../context/userContext';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

function Header() {
    const { userData, setUserData } = useContext(UserContext);
    const history = useHistory();
    const [dropdown, setDropdown] = useState(false);
    const toggleDropdown = () => {
        setDropdown(prev => prev = !prev);
    }
    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined
        });
        localStorage.setItem('auth-token', '');
        history.push('/login');
    }

    return (
        <div className="header">
            <div className="header__heading">
                <NavLink to="/">
                    <img
                        className="header__logo"
                        src={logo}
                        alt="LOGO" />
                </NavLink>
            </div>
            <div className="header__routes">
                {
                    userData.user ?
                        (<>
                            <NavLink to="/dashboard" activeClassName='is-active' className="header__menu">
                                <p >Dashboard</p>
                            </NavLink>
                            <NavLink to="/settings" activeClassName='is-active' className="header__menu">
                                <p>Settings</p>
                            </NavLink>
                            <div className="header__icons">
                                <AccountCircleIcon className="header__icon" />
                                <ArrowDropDownIcon className="header__icon" onClick={toggleDropdown} />
                                {dropdown &&
                                    <div className="header__user">
                                        <p className="header__userItem">{userData.user.displayName}</p>
                                        <p className="header__userItem" onClick={logout}>Logout</p>
                                    </div>
                                }
                            </div>
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
