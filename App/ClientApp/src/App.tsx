import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './styles.css';
import Submition from './components/Queue/Submission';
import Consultations from './components/Queue/Consultations';
import Login from './components/Auth/Login';
import Home from './components/Home';
import Layout from "./components/Layout";
import {AuthProvider} from "./components/AuthContext";

export default function App() {
    return (
        <AuthProvider>
            <Layout></Layout>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/submission" element={<Submition/>}/>
                <Route path="/consultations" element={<Consultations/>}/>
            </Routes>
        </AuthProvider>
    );
}