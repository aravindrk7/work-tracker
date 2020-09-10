import React, { useState } from 'react';
import './Settings.css'

function Settings() {
    const [formData, setFormData] = useState({ status: 'open' });

    const handleFormData = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setFormData(prev => (
            { ...prev, [name]: value }
        ));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        };
        fetch('http://localhost:5000/dashboard/add-work', requestOptions)
            .then(response => response.json()).then(setFormData({}))

    };
    return (
        <div className="settings">
            <form className="settings__form" onSubmit={handleSubmit}>
                <h1 className="settings__header">Add New Work</h1>

                <div className="settings__field">
                    <label className="settings__label">Category</label>
                    <input className="settings__inputRadio" type="radio" name="category" onChange={handleFormData} id="photoshop" value='photoshop' required />
                    <label className="settings__labelRadio" >Photoshop</label>
                    <input className="settings__inputRadio" type="radio" name="category" onChange={handleFormData} id="web" value='webDevelopment' required />
                    <label className="settings__labelRadio">Web Development</label>
                </div>
                <div className="settings__field">
                    <label className="settings__label">Sub Category</label>
                    <input className="settings__inputText" type="text" name="subCategory" onChange={handleFormData} required />
                </div>
                <div className="settings__field">
                    <label className="settings__label">Status</label>
                    <select className="settings__inputDropdown" name="status" onChange={handleFormData} id="status" required>
                        <option value="open" defaultValue>Open</option>
                        <option value="inProgress">InProgress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <div className="settings__field">
                    <label className="settings__label">Title</label>
                    <input className="settings__inputText" type="text" name="title" onChange={handleFormData} required />
                </div>
                <div className="settings__field">
                    <label className="settings__label">Earning</label>
                    <input className="settings__inputNumber" type="number" name="earning" onChange={handleFormData} required />
                </div>
                <div className="settings__btnContainer">
                    <button className="settings__button">Submit</button>
                </div>
            </form>

        </div>
    )
}

export default Settings;
