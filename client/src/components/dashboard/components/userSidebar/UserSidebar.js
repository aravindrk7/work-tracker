import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from './../../../../context/userContext';
import './UserSidebar.css';
import logo from './../../../../images/img.jpg';
import Charts from './../../../shared/charts/Charts';
import MenuIcon from '@material-ui/icons/Menu';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

function UserSidebar({ works }) {
    const { userData, setUserData } = useContext(UserContext);
    const history = useHistory();
    const [dropdown, setDropdown] = useState(false);
    const toggleDropdown = () => {
        setDropdown(prev => prev = !prev);
    }

    const getProgress = () => {
        const percentage = (works.list?.filter(item => {
            const date = new Date(item.startdate);
            return date.getMonth() == (new Date).getMonth() && item.status === 'completed';
        }).length / 5) * 100;
        return percentage > 100 ? 100 : percentage;
    };

    const state = {
        type: "radialBar",
        series: [getProgress() || 0],

        options: {
            chart: {
                offsetY: -10
            },
            title: {
                text: '',
                style: {
                    fontSize: '13px',
                    fontWeight: 'bold',
                    fontFamily: 'Mulish',
                    color:'#003366'
                }
            },
            plotOptions: {
                radialBar: {
                    startAngle: -135,
                    endAngle: 135,
                    dataLabels: {
                        name: {
                            fontSize: '11px',
                            fontWeight: 'bold',
                            fontFamily: 'Mulish',
                            textAlign: 'center',
                            color: '#888',
                            offsetY: 80,
                            offsetX: 80,
                        },
                        value: {
                            offsetY: -10,
                            fontWeight: 'bolder',
                            fontFamily: 'Mulish',
                            textAlign: 'center',
                            fontSize: '22px',
                            color: undefined,
                            formatter: function (val) {
                                return val + "%";
                            }
                        }
                    }
                }
            },
            fill: {
                type: 'gradient',
                colors: ['#5863f8'],
                gradient: {
                    shade: 'dark',
                    shadeIntensity: 0.15,
                    inverseColors: false,
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [0, 50, 65, 91]
                },
            },
            stroke: {
                dashArray: 4
            },
            labels: [`${getProgress() || 0}% of your goal completed.`],
        },


    };
    const [sidebarStyle, setSidebarStyle] = useState();

    const openSidebar = () => {
        setSidebarStyle({
            display: 'flex',
        });
    };
    const closeSidebar = () => {
        setSidebarStyle();
    };

    const logout = () => {
        setUserData({
            token: null,
            user: null
        });
        localStorage.setItem('auth-token', '');
        history.push('/login');
    }


    return (
        <>
            <div className="userSidebar__menu">
                <MenuIcon onClick={openSidebar} />
            </div>
            <div className="userSidebar__userMenu" style={sidebarStyle}>
                <MoreVertIcon className="userSidebar__userMenuIcon" onClick={toggleDropdown} />
                {dropdown &&
                    <div className="userSidebar__user">
                        <p className="userSidebar__userItem" onClick={logout}>Logout</p>
                    </div>
                }
            </div>
            <div className="userSidebar" style={sidebarStyle}>
                <div className="userSidebar__close" style={sidebarStyle}>
                    <KeyboardBackspaceIcon className="userSidebar__closeIcon" onClick={closeSidebar} />
                </div>
                <img className="userSidebar__image" src={logo} alt="" />
                <p className="userSidebar__displayName" >{userData.user?.displayName}</p>
                <p className="userSidebar__email" >{userData.user?.email}</p>
                <div className="userSidebar__progress">
                    <h1 className="userSidebar__progressHeading">Monthly Progress</h1>

                    <Charts state={state} />
                </div>
                <div className="userSidebar__status">
                    <h1 className="userSidebar__statusHeading">Project Status</h1>
                    <div className="userSidebar__statusItem">
                        <span className="userSidebar__statusItemName">Open</span>
                        <div>
                            <p className="userSidebar__statusItemValue">{works.open}</p>
                            <span className="userSidebar__statusItemIndicator" style={{ background: '#5863f8', color: '#5863f8' }} ></span>
                        </div>
                    </div>
                    <div className="userSidebar__statusItem">
                        <span className="userSidebar__statusItemName">InProgress</span>
                        <div>
                            <p className="userSidebar__statusItemValue">{works.inProgress}</p>
                            <span className="userSidebar__statusItemIndicator" style={{ background: '#ffab3d', color: '#ffab3d' }} ></span>
                        </div>
                    </div>
                    <div className="userSidebar__statusItem">
                        <span className="userSidebar__statusItemName">Completed</span>
                        <div>
                            <p className="userSidebar__statusItemValue">{works.completed}</p>
                            <span className="userSidebar__statusItemIndicator" style={{ background: '#34b028', color: '#34b028' }} ></span>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default UserSidebar;
