import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'; // Import your logo or image

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        // You can implement your authentication logic here
        // For now, let's assume username and password are correct
        // You may want to replace this with actual authentication logic
        if (username === 'admin' && password === 'password') {
            // Redirect to Home page after successful login
            console.log('Authentication successful');
            localStorage.setItem('isLoggedIn', 'true');
            console.log(localStorage.getItem('isLoggedIn'));
            navigate('/');
        } else {
            alert('Invalid username or password');
        }
    };

    return (
        <div className="container-fluid">
            <div className="row vh-100">
                {/* Left side with image/logo */}
                <div className="col-md-6 d-flex justify-content-center align-items-center">
                    <img src={logo} alt="Logo" style={{ maxWidth: '450px', height: 'auto', borderRadius: '20px'}} />
                </div>
                {/* Right side with login form */}
                <div className="col-md-6 d-flex justify-content-center align-items-center">
                    <div className="card bg-light" style={{ maxWidth: '600px' }}>
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">Smart home IOT Login</h2>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username:</label>
                                    <input type="text" id="username" className="form-control form-control-sm" value={username} onChange={(e) => setUsername(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password:</label>
                                    <input type="password" id="password" className="form-control form-control-sm" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="d-grid mb-3">
                                    <button type="button" className="btn btn-primary btn-lg" onClick={handleLogin}>Login</button>
                                </div>
                                <div className="d-grid gap-2">
                                    <a href="#" className="text-decoration-none">Add new account</a>
                                    <a href="#" className="text-decoration-none">Forgot password</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
