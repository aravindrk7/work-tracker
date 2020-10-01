import React from 'react';
import './InfoCard.css'

function InfoCard({ icon ,data}) {
    const MaterialIcon = ({ icon }) => {
        let iconName = icon.replace(/Icon$/, '');
        let resolved = require(`@material-ui/icons/${iconName}`).default;

        if (!resolved) {
            throw Error(`Could not find material-ui-icons/${iconName}`);
        }

        return React.createElement(resolved);
    }

    return (
        <div className="infoCard">
            <div className="info__icon">
                <MaterialIcon icon={icon.displayName} />
            </div>
            <div className="info__count">
                <p className="info__value">{data.value}</p>
                <h1 className="info__card-heading">{data.title}</h1>
            </div>
        </div>
    )
}

export default InfoCard;
