import React, { Component } from 'react';
import { Route, Router, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import Login from './components/Auth/Login.tsx';
import Home from './components/Home.tsx';
import './custom.css';

export default function App() {
  const isAuthenticated = true;

  return (
    <>
      <Layout>
      </Layout>
      {!isAuthenticated ? <Login /> : <Home />}
    </>


  );
}