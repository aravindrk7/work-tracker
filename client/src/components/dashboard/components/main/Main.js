import React from 'react';
import './Main.css';
import Dash from '../info/Info';
import List from '../list/List';

function Overall({ works }) {
    return (
        <div className="overall">
            <h1 className="overall__heading">Dashboard</h1>
            <main>
                <div className="overall__dashboard">
                    <Dash works={works} />
                </div>
                <div className="overall__workList" >
                    <List works={works.list} />
                </div >
            </main >
        </div >
    )
}

export default Overall;
