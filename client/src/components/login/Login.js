import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { config } from './../../constants';
import axios from 'axios';
import UserContext from './../../context/userContext';
import './Login.css';
import MessageNotice from '../shared/messageNoticie/messageNotice';

function Login() {
    const api_url = config.url.API_URL;
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const { setUserData } = useContext(UserContext);
    const history = useHistory();

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
            const loginRes = await axios.post(api_url + 'user/login', formData);
            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user
            });
            localStorage.setItem('auth-token', loginRes.data.token);
            history.push('/');
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
        <div className="login">
            <h1 className="login__heading">Login</h1>
            {message && (
                <MessageNotice message={message} clearMessage={clearMessage} type={messageType} />
            )}
            <form className="login__form" onSubmit={handleSubmit}>
                <div className="login__field">
                    <input className="login__input" type="text" placeholder=" " value={formData.email} name="email" onChange={handleFormData} required autoComplete='off' />
                    <label htmlFor="email" className="login__label">
                        <span className="login__labelName">Email</span>
                    </label>
                </div>
                <div className="login__field">
                    <input className="login__input" type="password" placeholder=" " value={formData.password} name="password" onChange={handleFormData} required autoComplete='off' />

                    <label htmlFor="password" className="login__label">
                        <span className="login__labelName">Password</span>
                    </label>
                </div>

                <div className="login__btnContainer">
                    <button className="login__button">Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login;
