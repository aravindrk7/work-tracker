import React from 'react';
import './Info.css';
import Charts from './../../../shared/charts/Charts'
import ComputerIcon from '@material-ui/icons/Computer';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import { useSpring, animated } from 'react-spring';

function Info({ works }) {
    const fadeIn = useSpring({
        from: { opacity: 0 },
        opacity: 1,

    })
    const state = {
        options: {
            chart: {
                id: "basic-bar",
            },
            title: {
                text: 'Projects per Month',
                style: {
                    fontSize: '13px',
                    fontWeight: 'bold',
                    fontFamily: 'ember'
                }
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            fill: {
                colors: ['var(--color--primary)']
            }
        },
        series: [
            {
                name: "Projects",
                data: works.graph || []
            }
        ]
    };
    return (
        <animated.div className="info" style={fadeIn}>

            <div className="info__card info__project">
                <div className="info__icon">
                    <ComputerIcon />
                </div>
                <div className="info__count">
                    <p className="info__value">{works.projects}</p>
                    <h1 className="info__card-heading">Projects</h1>
                </div>
            </div>

            <div className="info__card info__earning">
                <div className="info__icon">
                    <AttachMoneyIcon />
                </div>
                <div className="info__count">
                    <p className="info__value">{works.earnings}</p>
                    <h1 className="info__card-heading">Earnings</h1>
                </div>
            </div>

            <div className="info__card info__epp">
                <div className="info__icon">
                    <LocalAtmIcon />
                </div>
                <div className="info__count">
                    <p className="info__value">{Math.ceil(works.earningsPerProject || 0)}</p>
                    <h1 className="info__card-heading">Earnings / Project</h1>
                </div>
            </div>

            <div className="info__status info__card">
                <div className="info__status-card">
                    <span className="info__outer" style={{ background: "#00cddb" }}>
                        <span className="info__inner"></span>
                    </span>
                    <div className="info__count">
                        <p className="info__value">{works.open}</p>
                        <h1 className="info__card-heading">Open</h1>
                    </div>
                </div>

                <div className="info__status-card">
                    <span className="info__outer" style={{ background: "#fcba03" }}>
                        <span className="info__inner"> </span>
                    </span>
                    <div className="info__count">
                        <p className="info__value">{works.inProgress}</p>
                        <h1 className="info__card-heading">InProgress</h1>
                    </div>
                </div>
                <div className="info__status-card">
                    <span className="info__outer" style={{ background: "green" }}>
                        <span className="info__inner"> </span>
                    </span>
                    <div className="info__count">
                        <p className="info__value">{works.completed}</p>
                        <h1 className="info__card-heading">Completed</h1>
                    </div>
                </div >
            </div >

            <div className="info__card info__ppm">
                <div className="info__icon">
                    <EqualizerIcon />
                </div>
                <div className="info__count">
                    <p className="info__value">{parseFloat(works.projectPerMonth || 0).toFixed(1)}</p>
                    <h1 className="info__card-heading">Projects / Month</h1>
                </div>
            </div>
            <div className="info__card info__graph">
                <Charts state={state} />
            </div >
        </animated.div >
    )
}

export default Info;
