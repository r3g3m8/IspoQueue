import React, { useEffect } from 'react';
import Login from './Auth/Login.tsx';
import { useNavigate } from 'react-router-dom';

function Home() {
  // cookie check???
  const isAuthenticated = true;

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  });

  return (
    <div>
      <h1>Электронная очередь</h1>
    </div>
  )
}

export default Home