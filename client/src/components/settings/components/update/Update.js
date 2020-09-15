import React, { useEffect, useState } from 'react';
import './Update.css';
import { config } from './../../../../constants';
import { useSpring, animated } from 'react-spring';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';


function Update() {

    const api_url = config.url.API_URL;
    const [works, setWorks] = useState([]);

    useEffect(() => {
        fetch(api_url + 'dashboard')
            .then(response => response.json())
            .then(data => {
                console.log(data.list);
                setWorks(data.list);
                console.log(works);
            });
    }, []);

    const getDate = (date) => {
        date = new Date(date);
        date = date.getDate() + ',' + getMonthName(date) + ' ' + date.getFullYear();
        return date;
    };

    const getMonthName = (date) => {
        // date = new Date(date);
        let month = date.toLocaleString('default', { month: 'short' });
        return month;
    };

    // Animations
    const slide = useSpring({
        from: { marginTop: -500 },
        marginTop: 0,
    })



    return (
        <div className="update">
            <h1 className="update__heading">Update</h1>
            <main className="update__content">
                <div className='update__items'>
                    <h2 className="update__itemHeading">Date</h2>
                    <h2 className="update__itemHeading">Category</h2>
                    <h2 className="update__itemHeading">Sub-category</h2>
                    <h2 className="update__itemHeading">Title</h2>
                    <h2 className="update__itemHeading">Status</h2>
                    <h2 className="update__itemHeading">Earning</h2>
                    <h2 className="update__itemHeading">Action</h2>
                </div>
                {works?.map(work => (
                    <animated.div key={work._id} className='update__items' style={slide}>
                        <p className='update__item'>{getDate(work?.startdate)}</p>
                        <p className='update__item'>{work?.category}</p>
                        <p className='update__item'>{work?.subCategory}</p>
                        <p className='update__item'>{work?.title}</p>
                        <p className='update__item'>{work?.status}</p>
                        <p className='update__item'>₹{work?.earning}</p>
                        <div className="update__itemButtons">
                            <button className="update__itemButton">
                                <EditIcon className="update__icon" />
                            </button>
                            <button className="update__itemButton">
                                <DeleteIcon className="update__icon" />
                            </button>
                        </div>
                    </animated.div>
                ))}
            </main>
        </div>
    )
}

export default Update
