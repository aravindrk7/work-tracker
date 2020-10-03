import React, { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import './Main.css';
import Dash from '../info/Info';

import NoData from '../../../shared/noData/NoData';
import { withRouter } from 'react-router-dom';
import HeaderContext from './../../../../context/headerContext';
import UserSidebar from '../userSidebar/UserSidebar';

function Main({ works }) {
    const { setHeaderData } = useContext(HeaderContext);
    const location = useLocation();
    const currentRoute = {
        "/dashboard/overall": 'All',
        "/dashboard/photoshop": 'Photoshop',
        "/dashboard/web-dev": 'Web Development'
    };
    useEffect(() => {

        setHeaderData({
            heading: 'Overview',
            subHeading: `Category - ${currentRoute[location.pathname]}`
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);
    return (
        <div className="main">

            <main className="main__content">
                {Object.keys(works).length !== 0 && works?.projects !== 0 ?
                    (
                        <div className="main__dashboard">
                            <Dash works={works} />
                        </div>
                    ) :
                    (
                        <div className="noData__container">
                            <NoData message={'Add work to show here'} />
                        </div>
                    )}
                <div className="main__user">
                    <UserSidebar works={works} />
                </div>

            </main >

        </div >
    )
}

export default withRouter(Main);
