import React from 'react';
import './ListItem.css';
import { useSpring, animated } from 'react-spring';

function ListItem({ work }) {

    const getMonth = (date) => {
        date = new Date(date);
        let month = date.toLocaleString('default', { month: 'short' });
        return month;
    };
    const getDay = (date) => {
        date = new Date(date);
        let day = date.getDate();
        return day;
    };

    // Animations
    const slide = useSpring({
        from: { marginTop: -500 },
        marginTop: 0,
    })


    return (
        <animated.div className="listItem" style={slide}>
            <div className="listItem__layer1">
                <div className="listItem__content">
                    <p className="listItem__month">{getMonth(work.startdate)}</p>
                    <span className="listItem__day">{getDay(work.startdate)}</span>
                </div>
            </div>
            <div className="listItem__layer2"></div>
            <div className="listItem__details">
                <div className="listItem__heading">
                    <h1 className="listItem__subHeading">{work.subCategory}</h1>
                    <p className="listItem__description">{work.title}</p>
                </div>
                <div className="listItem__earning">
                    <span>₹{work.earning}</span>
                </div>
            </div>
        </animated.div>
    )
}

export default ListItem
