import React from 'react';
import './Popup.css';
import WorkForm from '../../settings/components/workForm/WorkForm';
import CloseIcon from '@material-ui/icons/Close';


function Popup({ closePopup, action ,formProps}) {
    const handleClosePopup = () => {
        closePopup();
    };
    return (
        <div className="popup">
            <div className="popup__overlay">
                <div className="popup__box">
                    <div className="popup__header">
                        <h1 className="popup__heading">{action}</h1>
                        <CloseIcon className="popup__close" onClick={handleClosePopup} />
                    </div>
                    <div className="popup__content">
                        <WorkForm action={action} formProps={formProps}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Popup
