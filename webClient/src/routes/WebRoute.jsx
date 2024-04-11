/* import {Route, Routes, BrowserRouter} from 'react-router-dom'
import Home from '../pages/Home'
import App from '../App';
import Insights from '../pages/InSight';

function WebRouter(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App></App>}>
                    <Route path='InSights' element={<Insights></Insights>}/>
                    <Route index element={<Home></Home>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
} */

import React from 'react';
import { Route, Routes, BrowserRouter, Navigate} from 'react-router-dom';
import Home from '../pages/Home';
import App from '../App';
import Insights from '../pages/InSight';
import Login from '../pages/Login'; // Import the Login component


function WebRouter() {
    localStorage.removeItem('isLoggedIn');
    // Initialize isLoggedIn to false if it's not already set in localStorage
    if (localStorage.getItem('isLoggedIn') === null) {
        localStorage.setItem('isLoggedIn', 'false');
    }
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<App />}>
                    <Route index element={<ProtectedRoute />} />
                    <Route path="insights" element={<ProtectedRoute />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

function ProtectedRoute() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    console.log("Inside ProtectedRoute");
    console.log('isLoggedIn:', isLoggedIn);
    return isLoggedIn ? <Home /> : <Navigate to="/login" />;
}

export default WebRouter;