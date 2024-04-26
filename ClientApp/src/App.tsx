import React, { Component } from 'react';
import { Navigate, Route, Router, Routes, redirect, useNavigate } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import Login from './components/Auth/Login.tsx';
import Home from './components/Home.tsx';
import './styles.css';

export default function App() {
  

  return (
    <>
      <Layout></Layout>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />}/>
      </Routes>
    </>


  );
}