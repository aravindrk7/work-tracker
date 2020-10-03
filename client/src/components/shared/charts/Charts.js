import React from 'react';
import Chart from "react-apexcharts";
import './Chart.css';

function Charts({state}) {
    return (
        <div className='chart'>
            <Chart
                options={state.options}
                series={state.series}
                type={state.type}
                width="100%"
                height="100%"
            />
        </div>
    )
}

export default Charts;
