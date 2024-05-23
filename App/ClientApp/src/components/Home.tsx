import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Admin from './Admin';
import Display from './Display';
import Operator from './Operator';
import Queue from './Queue';

type Role = 'display' | 'admin' | 'operator' | 'terminal' | null;

function Home() {
  const isAuthenticated = true; // cookie check???
  const [role, setRole] = useState<Role>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } /*else {
      setRole('operator'); // Пример начального значения роли
    }*/
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    // Пример изменения роли на 'display' после монтирования компонента
    setRole('admin');
  }, []);

  return (
      <div>
        {role === 'admin' ? (
            <Admin />
        ) : role === 'display' ? (
            <Display />
        ) : role === 'operator' ? (
            <Operator />
        ) : (
            <Queue />
        )}
      </div>
  );
}

export default Home;
