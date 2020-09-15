import React from 'react';
import './Main.css';
import Dash from '../info/Info';
import List from '../list/List';

function Overall({ works }) {
    return (
        <div className="main">
            <h1 className="main__heading">Dashboard</h1>
            <main className="main__content">
                <div className="main__dashboard">
                    <Dash works={works} />
                </div>
                <div className="main__workList" >
                    <List works={works.list} />
                </div >
            </main >
        </div >
    )
}

export default Overall;
