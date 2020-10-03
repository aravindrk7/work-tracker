import React from 'react';
import './Info.css';
import Charts from './../../../shared/charts/Charts';
import ComputerIcon from '@material-ui/icons/Computer';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import { useSpring, animated } from 'react-spring';
import InfoCard from './components/infoCard/InfoCard';
import List from '../../components/list/List';

function Info({ works }) {
    const fadeIn = useSpring({
        from: { opacity: 0 },
        opacity: 1,

    })
    const state = {
        type: "bar",
        options: {
            chart: {
                id: "basic-bar",
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                }
            },
            title: {
                text: 'Projects per Month',
                style: {
                    fontSize: '13px',
                    fontWeight: 'bold',
                    fontFamily: 'Mulish',
                    color: '#003366'
                }
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                labels: {
                    style: {
                        fontSize: '11px',
                        fontWeight: 'bold',
                        fontFamily: 'Mulish'
                    }
                }
            },
            yaxis: {
                labels: {
                    style: {
                        fontSize: '11px',
                        fontWeight: 'bold',
                        fontFamily: 'Mulish'
                    }
                }
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

            <div className="info__card info__ppm">
                <InfoCard icon={EqualizerIcon} data={{ title: 'Projects / Month', value: parseFloat(works.projectPerMonth || 0).toFixed(1) }} />
            </div>

            <div className="info__card info__graph">
                <Charts state={state} />
            </div >

            <div className="info__card info__workList" >
                <h1 className="info__WorkListHeading">Work List</h1>
                <List works={works.list} />
            </div >
        </animated.div >
    )
}

export default Info;
