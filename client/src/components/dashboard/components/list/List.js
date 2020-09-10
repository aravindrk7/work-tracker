import React from 'react';
import './List.css';
import { useSpring, animated } from 'react-spring';

function List({ works }) {

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
        from: {  marginTop: -500 },
        marginTop: 0,
    })

    return (

        <div className='list'>
            <div className="list__body">
                {works?.map(work => (
                    <animated.div key={work._id} className="list__work" style={slide}>
                        <div className="list__layer1">
                            <div className="list__content">
                                <p className="list__month">{getMonth(work.startdate)}</p>
                                <span className="list__day">{getDay(work.startdate)}</span>
                            </div>
                        </div>
                        <div className="list__layer2"></div>
                        <div className="list__layer3">
                            <div className="list__layer4"></div>
                        </div>
                        <div className="list__details">
                            <div className="list__heading">
                                <h1 className="list__subHeading">{work.subCategory}</h1>
                                <p className="list__description">{work.title}</p>
                            </div>
                            <div className="list__earning">
                                <span>₹{work.earning}</span>
                            </div>
                        </div>
                    </animated.div>
                ))}
            </div>
        </div>
    )
}

export default List
