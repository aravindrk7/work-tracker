import React, { useState } from 'react';
import { config } from '../../../../constants';

import './WorkForm.css';
import axios from 'axios';
function WorkForm({ action, formProps, refreshList }) {
    const api_url = config.url.API_URL;

    const [formData, setFormData] = useState(formProps);

    const handleFormData = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setFormData(prev => (
            { ...prev, [name]: value }
        ));
    };

    const handleRefreshList = (work) => {
        refreshList(work);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (action === 'Add New Work') {
            axios.post(api_url + 'work/add', formData)
                .then(response => {
                    setFormData(formProps);
                    handleRefreshList();
                });
        }
        else {
            axios.patch(api_url + 'work/update', formData)
                .then(response => {
                    handleRefreshList();
                });
        }


    };

    return (
        <form className="workForm" onSubmit={handleSubmit}>
            <div className="workForm__field">
                <label className="workForm__label">Category</label>
                <div>
                    <input className="workForm__inputRadio" checked={(formData.category === 'photoshop') ? true : false} type="radio" name="category" onChange={handleFormData} id="photoshop" value='photoshop' required />
                    <label className="workForm__labelRadio" htmlFor="photoshop">Photoshop</label>
                    <input className="workForm__inputRadio" checked={(formData.category === 'webDevelopment') ? true : false} type="radio" name="category" onChange={handleFormData} id="web" value='webDevelopment' required />
                    <label className="workForm__labelRadio" htmlFor="web">Web Development</label>
                </div>
            </div>
            <div className="workForm__field">
                <label className="workForm__label">Sub Category</label>
                <input className="workForm__inputText" type="text" value={formData.subCategory} name="subCategory" onChange={handleFormData} required autoComplete='off' />
            </div>
            <div className="workForm__field">
                <label className="workForm__label">Status</label>
                <select className="workForm__inputDropdown" value={formData.status} name="status" onChange={handleFormData} id="status" required>
                    <option value="open" defaultValue>Open</option>
                    <option value="inProgress">InProgress</option>
                    <option value="completed">Completed</option>
                </select>
            </div>
            <div className="workForm__field">
                <label className="workForm__label">Title</label>
                <input className="workForm__inputText" type="text" value={formData.title} name="title" onChange={handleFormData} required autoComplete='off' />
            </div>
            <div className="workForm__field">
                <label className="workForm__label">Earning</label>
                <input className="workForm__inputNumber" type="number" value={formData.earning} name="earning" onChange={handleFormData} required autoComplete='off' />
            </div>
            <div className="workForm__btnContainer">
                <button className="workForm__button">{(action === "Update") ? action : "Add"}</button>
            </div>
        </form>
    )
}

export default WorkForm;
