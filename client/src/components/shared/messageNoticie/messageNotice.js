import React, { useState } from 'react';
import './messageNotice.css';
import CloseIcon from '@material-ui/icons/Close';

function MessageNotice({ message, clearMessage, type }) {

    let style;

    const handleClear = () => {
        clearMessage();
    };
    if (type === 'error') {
        style = {
            background: 'rgb(255, 183, 183)',
            boxShadow: '0 0 5px rgb(255, 183, 183), 0 0 2px rgb(226, 0, 0)'
        };
    }
    else {
        style = {
            background: 'rgb(178, 224, 169)',
            boxShadow: '0 0 5px rgb(178, 224, 169), 0 0 2px rgb(1, 105, 9)'
        };
    }
    return (
        <div className="message" style={style}>
            <span className="message__text">{message}</span>
            <CloseIcon className="message__clear" onClick={handleClear} />
        </div>
    )
}

export default MessageNotice;
