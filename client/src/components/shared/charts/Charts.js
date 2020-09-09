import React from 'react';
import Chart from "react-apexcharts";
import './Chart.css';

function Charts({state}) {
    console.log(state);
    return (
        <div className='chart'>
            <Chart
                options={state.options}
                series={state.series}
                type="bar"
                width="100%"
                height="200px"
            />
        </div>
    )
}

export default Charts;
