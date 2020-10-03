import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import './Settings.css';
import { config } from './../../constants';
import { useSpring, animated } from 'react-spring';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import FilterListIcon from '@material-ui/icons/FilterList';
import axios from 'axios';
import UserContext from './../../context/userContext';
import HeaderContext from './../../context/headerContext';
import Popup from './../shared/popup/Popup';
import NoData from './../shared/noData/NoData';

function Settings() {
    const api_url = config.url.API_URL;
    const [works, setWorks] = useState([]);
    const [popup, setPopup] = useState(false);
    const [formProps, setFormProps] = useState({});
    const [action, setAction] = useState('');
    const [updateCount, setUpdateCount] = useState(0);
    const { userData } = useContext(UserContext);
    const history = useHistory();
    const { headerData, setHeaderData } = useContext(HeaderContext);
    useEffect(() => {
        setHeaderData({
            heading: 'Manage Project',
            subHeading: `${works.length || 0} projects found`
        });
    }, [works]);

    useEffect(() => {
        if (typeof userData.user !== 'undefined') {
            if (!userData.user) {
                history.push('/login')
            }
            else {
                axios.get(api_url + 'dashboard/all/' + userData.user.email)
                    .then(response => {
                        setWorks(response.data.list);
                    });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updateCount, userData.user]);

    const getDate = (date) => {
        date = new Date(date);
        date = date.getDate() + ',' + getMonthName(date) + ' ' + date.getFullYear();
        return date;
    };

    const getMonthName = (date) => {
        let month = date.toLocaleString('default', { month: 'short' });
        return month;
    };


    const refreshList = () => {
        setUpdateCount(prevCount => prevCount + 1);
    };


    const openPopup = (action, id) => {
        let selectedWork;
        if (id) {
            selectedWork = works.find(work => {
                return work._id === id;
            });
        }
        else {
            selectedWork = {
                category: "",
                earning: 0,
                status: "open",
                subCategory: "",
                title: "",
                email: userData.user.email

            };
        }
        setFormProps(selectedWork);
        setAction(action);
        setPopup(true);
    }
    const closePopup = () => {
        setPopup(false);
    }

    const handleDelete = (id) => {
        axios.delete(api_url + 'work/delete/' + id)
            .then(response => {
                refreshList();
            });
    };


    // Animations
    const slide = useSpring({
        from: { marginTop: -500 },
        marginTop: 0,
    });

    return (

        <div className="settings">
            {popup && <Popup closePopup={closePopup} action={action} formProps={formProps} refreshList={refreshList} />}
            <div className="settings__header">
                <div className="settings__tab">
                    {/* <p className="settings__tabName">All</p>
                    <p className="settings__tabName">Photoshop</p>
                    <p className="settings__tabName">Web-dev</p> */}
                </div>
                <div className="settings__headerButtons">
                    <button className="settings__headerButton settings__headerButton--white">
                        <FilterListIcon className="settings__headerButtonIcon" />
                        <span className="settings__headerButtonName">Filter</span>
                    </button>
                    <button className="settings__headerButton" onClick={() => openPopup('Add New Work')}>
                        <AddIcon className="settings__headerButtonIcon" />
                        <span className="settings__headerButtonName">Add New Work</span>
                    </button>
                </div>
            </div>
            {Object.keys(works).length !== 0 && works?.projects !== 0 ?
                (
                    <main className="settings__content">
                        <div className='settings__itemsHeading'>
                            <h2 className="settings__itemHeading">Date</h2>
                            <h2 className="settings__itemHeading">Category</h2>
                            <h2 className="settings__itemHeading">Sub-category</h2>
                            <h2 className="settings__itemHeading">Title</h2>
                            <h2 className="settings__itemHeading">Status</h2>
                            <h2 className="settings__itemHeading">Earning</h2>
                            <h2 className="settings__itemHeading">Action</h2>
                        </div>
                        <div className='settings__itemsRow'>
                            {works?.map(work => (
                                <animated.div key={work._id} className='settings__items' style={slide}>
                                    <div>
                                        <h2 className="settings__itemHeading--mobile">Date</h2>
                                        <p title={work?.startdate} className='settings__item settings__item--date'>{getDate(work?.startdate)}</p>
                                    </div>
                                    <div>
                                        <h2 className="settings__itemHeading--mobile">Category</h2>
                                        <p title={work?.category} className='settings__item'>{work?.category}</p>
                                    </div>
                                    <div>
                                        <h2 className="settings__itemHeading--mobile">Sub-category</h2>
                                        <p title={work?.subCategory} className='settings__item'>{work?.subCategory}</p>
                                    </div>
                                    <div>
                                        <h2 className="settings__itemHeading--mobile">Title</h2>
                                        <p title={work?.title} className='settings__item'>{work?.title}</p>
                                    </div>
                                    <div>
                                        <h2 className="settings__itemHeading--mobile">Status</h2>
                                        <p title={work?.status} className='settings__item settings__item--status'>{work?.status}</p>
                                    </div>
                                    <div>
                                        <h2 className="settings__itemHeading--mobile ">Earning </h2>
                                        <p title={work?.earning} className='settings__item settings__item--earning'>₹{work?.earning}</p>
                                    </div>
                                    {/* <h2 className="settings__itemHeading--mobile">Action</h2> */}
                                    <div className="settings__itemButtons">
                                        <button className="settings__itemButton" onClick={() => openPopup('Update', work._id)} title="Edit">
                                            <EditIcon className="settings__icon" />
                                        </button>
                                        <button className="settings__itemButton" onClick={() => handleDelete(work._id)} title="Delete">
                                            <DeleteIcon className="settings__icon" />
                                        </button>
                                    </div>
                                </animated.div>
                            ))}
                        </div>
                    </main>
                ) :
                (
                    <div className="noData__container">
                        <NoData message={'Add work to show here'} />
                    </div>
                )}
        </div >
    )
}

export default Settings;
