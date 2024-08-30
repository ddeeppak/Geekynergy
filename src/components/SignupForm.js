import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignupForm.css';

const SignupForm = () => {
    const [Name, setName] = useState('');
    const [Password, setPassword] = useState('');
    const [Email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [Profession, setProfession] = useState('Default');

    const [isNameValid, setIsNameValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);

    const navigate = useNavigate();

    // RegEx patterns
    const namePattern = /^[a-zA-Z\s]+$/;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneNumberPattern = /^[0-9]{10}$/;

    const handleNameChange = (e) => {
        const value = e.target.value;
        setName(value);
        setIsNameValid(namePattern.test(value));
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        setIsPasswordValid(passwordPattern.test(value));
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        setIsEmailValid(emailPattern.test(value));
    };

    const handlePhoneNumberChange = (e) => {
        const value = e.target.value;
        setPhoneNumber(value);
        setIsPhoneNumberValid(phoneNumberPattern.test(value));
    };

    const isFormValid = () => {
        return (
            isNameValid &&
            isPasswordValid &&
            isEmailValid &&
            isPhoneNumberValid &&
            Profession !== 'Default'
        );
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!isFormValid()) {
            return;
        }

        const user = {
            Name,
            Password,
            Email,
            phoneNumber,
            Profession,
        };

        localStorage.setItem('user', JSON.stringify(user));
        navigate('/login');
    };

    return (
        <form className="signup-form" onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <input
                type="text"
                placeholder="Name"
                value={Name}
                onChange={handleNameChange}
                className={!isNameValid ? 'invalid' : ''}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={Password}
                onChange={handlePasswordChange}
                className={!isPasswordValid ? 'invalid' : ''}
                required
            />
            <input
                type="text"
                placeholder="Email"
                value={Email}
                onChange={handleEmailChange}
                className={!isEmailValid ? 'invalid' : ''}
                required
            />
            <input
                type="text"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                className={!isPhoneNumberValid ? 'invalid' : ''}
                required
            />
            <select
                value={Profession}
                onChange={(e) => setProfession(e.target.value)}
                required
            >
                <option value="Default">Profession</option>
                <option value="Engineer">Engineer</option>
                <option value="Doctor">Doctor</option>
                <option value="Teacher">Teacher</option>
                <option value="Other">Other</option>
            </select>
            <button type="submit" disabled={!isFormValid()}>
                Sign Up
            </button>
        </form>
    );
};

export default SignupForm;
