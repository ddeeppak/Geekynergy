import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = () => {

    const [Name, setName] = useState('');
    const [Password, setPassword] = useState('');
    const navigate = useNavigate();
    
    const handleSubmit = (event) => {
        if(!localStorage.getItem('user')){ 
            alert("Please SignUp");
            navigate('/signup');
            return;
        }
        event.preventDefault();
        const user = JSON.parse(localStorage.getItem('user'));
        if ((user.Name===Name)&&(user.Password===Password)) {
            localStorage.setItem('login',true);
            navigate('/');
        } else {
            alert('Invalid Credentials');
        }
    };
    const handleSignupRedirect = () => {
        navigate('/signup');
    };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Name"
                value={Name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="Password"
                placeholder="Password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Login</button>
            <button type="button" onClick={handleSignupRedirect} className="signup-button">Signup</button>
        </form>
    );
};

export default LoginForm;
