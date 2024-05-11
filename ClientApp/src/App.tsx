import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import './styles.css';
import Submition from './components/Queue/Submission/index.tsx';
import Consultations from './components/Queue/Consultations/index.tsx';
import Login from './components/Auth/Login.tsx';
import Home from './components/Home.tsx';
import {FetchData} from "./components/FetchData.tsx";

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