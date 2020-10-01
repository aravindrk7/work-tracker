import React from 'react';
import './Info.css';
import Charts from './../../../shared/charts/Charts'
import ComputerIcon from '@material-ui/icons/Computer';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import { useSpring, animated } from 'react-spring';
import InfoCard from './components/infoCard/InfoCard';
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import WatchLaterIcon from '@material-ui/icons/WatchLater';

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
                <InfoCard icon={ComputerIcon} data={{ title: 'Projects', value: works.projects }} />
            </div>

            <div className="info__card info__earning">
                <InfoCard icon={AttachMoneyIcon} data={{ title: 'Earnings', value: works.earnings }} />
            </div>

            <div className="info__card info__epp">
                <InfoCard icon={LocalAtmIcon} data={{ title: 'Earnings / Project', value: Math.ceil(works.earningsPerProject || 0) }} />
            </div>

            <div className="info__status info__card">
                <div className="info__status-card">
                    <InfoCard icon={OfflineBoltIcon} data={{ title: 'Open', value: works.open }} />
                </div>

                <div className="info__status-card">
                    <InfoCard icon={WatchLaterIcon} data={{ title: 'InProgress', value: works.inProgress }} />
                </div>
                <div className="info__status-card">
                    <InfoCard icon={CheckCircleIcon} data={{ title: 'Completed', value: works.completed }} />
                </div >
            </div >

            <div className="info__card info__ppm">
                <InfoCard icon={EqualizerIcon} data={{ title: 'Projects / Month', value: parseFloat(works.projectPerMonth || 0).toFixed(1) }} />
            </div>

            <div className="info__card info__graph">
                <Charts state={state} />
            </div >
        </animated.div >
    )
}

export default Info;
