import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { config } from './../../constants';
import axios from 'axios';
import UserContext from './../../context/userContext';
import './Register.css';
import MessageNotice from '../shared/messageNoticie/messageNotice';

function Register() {
    const { setUserData } = useContext(UserContext);
    const history = useHistory();
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        passwordCheck: '',
        displayName: ''
    });
    const api_url = config.url.API_URL;
    const handleFormData = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setFormData(prev => (
            { ...prev, [name]: value }
        ));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(api_url + 'user/register', formData);
            // const loginRes = await axios.post(api_url + 'user/login', {
            //     email: formData.email,
            //     password: formData.password
            // });
            // setUserData({
            //     token: loginRes.data.token,
            //     user: loginRes.data.user
            // });
            // localStorage.setItem('auth-token', loginRes.data.token);
            // history.push('/');
            setMessage('Registration Successful. Login to Continue.');
            setMessageType('success');

        } catch (error) {
            if (error.response.data.msg) {
                setMessage(error.response.data.msg);
                setMessageType('error');
            }
        }
    };

    const clearMessage = () => {
        setMessage(undefined);
        setMessageType(undefined);
    };

    return (
        <div className="register">
            <h1 className="register__heading">Register</h1>
            {message && (
                <MessageNotice message={message} clearMessage={clearMessage} type={messageType} />
            )}
            <form className="register__form" onSubmit={handleSubmit}>
                <div className="register__field">
                    <input className="register__input" type="text" placeholder=" " value={formData.email} name="email" onChange={handleFormData} required autoComplete='off' />
                    <label htmlFor="email" className="register__label">
                        <span className="register__labelName">Email</span>
                    </label>
                </div>
                <div className="register__field">
                    <input className="register__input" type="password" placeholder=" " value={formData.password} name="password" onChange={handleFormData} required autoComplete='off' />

                    <label htmlFor="password" className="register__label">
                        <span className="register__labelName">Password</span>
                    </label>
                </div>
                <div className="register__field">
                    <input className="register__input" type="password" placeholder=" " value={formData.passwordCheck} name="passwordCheck" onChange={handleFormData} required autoComplete='off' />
                    <label htmlFor="passwordCheck" className="register__label">
                        <span className="register__labelName">Confirm Password</span>
                    </label>
                </div>
                <div className="register__field">
                    <input className="register__input" type="text" placeholder=" " value={formData.displayName} name="displayName" onChange={handleFormData} autoComplete='off' />
                    <label htmlFor="displayName" className="register__label">
                        <span className="register__labelName">Display Name</span>
                    </label>
                </div>

                <div className="register__btnContainer">
                    <button className="register__button">Register</button>
                </div>
            </form>
        </div>
    )
}

export default Register;
