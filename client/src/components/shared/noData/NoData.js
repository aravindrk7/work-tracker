import React from 'react';
import './NoData.css';

function NoData({ message }) {
    return (
        <div className='noData'>
            <h1 className="noData__message">{message}</h1>
        </div>
    )
}

export default NoData
