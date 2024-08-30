import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Home from './components/Home';

function App() {
    return (
            <Router>
                <Routes>
                    <Route path='/login' element={<LoginForm />} />
                    <Route path='/signup' element={<SignupForm />} />
                    <Route path='/' element={<Home />} />
                </Routes>
            </Router>
    );
}

export default App;
