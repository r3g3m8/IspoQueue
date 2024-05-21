import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import './styles.css';
import Submition from './components/Queue/Submission';
import Consultations from './components/Queue/Consultations';
import Login from './components/Auth/Login';
import Home from './components/Home';
import {FetchData} from "./components/FetchData";

export default function App() {
  return (
    <>
      <Layout></Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/submission" element={<Submition />} />
        <Route path="/consultations" element={<Consultations />} />
          <Route path="/fetch-data" element={<FetchData />} />
      </Routes>
    </>
  );
}