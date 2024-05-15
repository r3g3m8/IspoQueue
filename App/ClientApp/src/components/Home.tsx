import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button/index.tsx';
import { Container } from 'reactstrap';
import { Flex } from 'antd';
import Admin from './Admin/index.tsx';
import Display from './Display/index.tsx';
import Operator from './Operator/index.tsx';
import Queue from './Queue/index.tsx';

type Role = 'display' | 'admin' | 'operator' | 'terminal' | null;

function Home() {
  // cookie check???

  const isAuthenticated = true;
  
  // Чтобы поменять роль и отобразить другие страницы, пока все через костыли
  let role: Role = 'display';
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
    role = "display"
  });

  return (
    <div>
      {role === "admin" ?
        <Admin />
        : role === "display" ? <Display /> : 
         role === "operator" ? <Operator /> :
          <Queue /> }
    </div>
  )
}

export default Home