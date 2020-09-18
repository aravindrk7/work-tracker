import React from 'react';
import './Popup.css';
import WorkForm from '../../settings/components/workForm/WorkForm';
import CloseIcon from '@material-ui/icons/Close';
import { useSpring, animated } from 'react-spring';

function Popup({ closePopup, action, formProps, refreshList }) {
    const handleClosePopup = () => {
        closePopup();
    };
    // Animations
    const slide = useSpring({
        from: { marginTop: -500 },
        marginTop: 0,
    })

    return (
        <div className="popup" >
            <div className="popup__overlay">
                <animated.div className="popup__box" style={slide}>
                    <div className="popup__header">
                        <h1 className="popup__heading">{action}</h1>
                        <CloseIcon className="popup__close" onClick={handleClosePopup} />
                    </div>
                    <div className="popup__content">
                        <WorkForm action={action} formProps={formProps} refreshList={refreshList} />
                    </div>
                </animated.div>
            </div>
        </div>
    )
}

export default Popup
