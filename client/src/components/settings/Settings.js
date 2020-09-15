import React, { useEffect, useState } from 'react';
import './Settings.css';
import { config } from './../../constants';
import { useSpring, animated } from 'react-spring';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import FilterListIcon from '@material-ui/icons/FilterList';
import axios from 'axios';

import Popup from './../shared/popup/Popup';

function Settings() {
    const api_url = config.url.API_URL;
    const [works, setWorks] = useState([]);
    const [popup, setPopup] = useState(false);
    const [formProps, setFormProps] = useState({});
    const [action, setAction] = useState('');

    useEffect(() => {
        axios.get(api_url + 'dashboard')
            .then(response => {
                setWorks(response.data.list);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getDate = (date) => {
        date = new Date(date);
        date = date.getDate() + ',' + getMonthName(date) + ' ' + date.getFullYear();
        return date;
    };

    const getMonthName = (date) => {
        let month = date.toLocaleString('default', { month: 'short' });
        return month;
    };


    const openPopup = (action, id) => {
        // console.log(id);
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
                title: ""

            };
        }
        setFormProps(selectedWork);
        setAction(action);
        setPopup(true);
    }
    const closePopup = () => {
        setPopup(false);
    }

    // Animations
    const slide = useSpring({
        from: { marginTop: -500 },
        marginTop: 0,
    })

    return (

        <div className="settings">
            {popup && <Popup closePopup={closePopup} action={action} formProps={formProps} />}
            <div className="settings__header">
                <h1 className="settings__heading">Settings</h1>
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
                            <p className='settings__item'>{getDate(work?.startdate)}</p>
                            <p className='settings__item'>{work?.category}</p>
                            <p className='settings__item'>{work?.subCategory}</p>
                            <p className='settings__item'>{work?.title}</p>
                            <p className='settings__item'>{work?.status}</p>
                            <p className='settings__item'>₹{work?.earning}</p>
                            <div className="settings__itemButtons">
                                <button className="settings__itemButton" onClick={() => openPopup('Update', work._id)}>
                                    <EditIcon className="settings__icon" />
                                </button>
                                <button className="settings__itemButton">
                                    <DeleteIcon className="settings__icon" />
                                </button>
                            </div>
                        </animated.div>
                    ))}
                </div>
            </main>
        </div >
    )
}

export default Settings;
