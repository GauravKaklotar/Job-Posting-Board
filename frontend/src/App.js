import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import JobPosting from './pages/JobPosting';
import AddCandidate from './pages/AddCandidate';
import Dashboard from './pages/Dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route index element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/job-posting" element={<JobPosting />} />
                <Route path="/add-candidate" element={<AddCandidate />} />
            </Routes>
            <ToastContainer 
                position="top-center" 
                autoClose={4000} 
                hideProgressBar={false} 
                newestOnTop={false} 
                closeOnClick 
                rtl={false} 
                pauseOnFocusLoss 
                draggable 
                pauseOnHover
            />
        </Router>
    );
}

export default App;
