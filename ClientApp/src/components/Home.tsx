import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button/index.tsx';
import { Container } from 'reactstrap';
import { Flex } from 'antd';
import Admin from './Admin/index.tsx';


function Home() {
  // cookie check???
  const isAuthenticated = true;
  const role = "admin";
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  });

  return (
    <div>


      {role == "admin" ?
          <Admin />
        : <>
          <Container className='d-flex flex-column align-items-center justify-content-center'>
            <h1>Выберите услугу</h1>
            <Flex gap="middle" align="center" vertical>
              <Flex justify="space-between" align="center" vertical>
                <Button href='/submission' queue>Подача документов</Button>
                <Button href='/consultations' queue>Консультации</Button>
                <Button href='' queue>Прием оригиналов документов об образовании / Выдача документов</Button>
              </Flex>
            </Flex>
          </Container>
        </>}


    </div>
  )
}

export default Home