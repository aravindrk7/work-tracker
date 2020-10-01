import React from 'react';
import './List.css';
import ListItem from './components/listItem/ListItem';

function List({ works }) {
    return (

        <div className='list'>
            <div className="list__body">
                {works?.map(work => (
                    <ListItem key={work._id} work={work}/>
                ))}
            </div>
        </div>
    )
}

export default List
