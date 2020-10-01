import React from 'react';
import './Main.css';
import Dash from '../info/Info';
import List from '../list/List';
import NoData from '../../../shared/noData/NoData';
import { withRouter } from 'react-router-dom';

function Main({ works }) {
    return (
        <div className="main">
            <h1 className="main__heading">Dashboard</h1>
            {Object.keys(works).length !== 0 && works?.projects !== 0 ?
                (
                    <main className="main__content">
                        <div className="main__dashboard">
                            <Dash works={works} />
                        </div>
                        <div className="main__workList" >
                            <h1 className="main__WorkListHeading">Work List</h1>
                            <List works={works.list} />
                        </div >
                    </main >
                ) :
                (
                    <div className="noData__container">
                        <NoData message={'Add work to show here'} />
                    </div>
                )}
        </div >
    )
}

export default withRouter(Main);
