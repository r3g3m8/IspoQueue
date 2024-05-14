import { Flex } from 'antd'
import React from 'react'
import { Container } from 'reactstrap'
import Button from '../Button/index.tsx'
import axios from 'axios';

function Queue() {
    const handleAddTicket = async (serviceId: number) => {
        try {
            const response = await axios.post('/api/Queue', { serviceId });
            console.log(response.data);
            // Добавьте здесь логику обработки успешного создания заявки
        } catch (error) {
            console.error('Error creating ticket:', error);
            // Добавьте здесь логику обработки ошибки
        }
    };

  return (
    <Container className='d-flex flex-column align-items-center justify-content-center'>
            <h1>Выберите услугу</h1>
            <Flex gap="middle" align="center" vertical>
              <Flex justify="space-between" align="center" vertical>
                <Button href='/submission' queue>Подача документов</Button>
                <Button href='/consultations' queue>Консультации</Button>
                <Button onClick={() => handleAddTicket(1)} queue>Прием оригиналов документов об образовании / Выдача документов</Button>
              </Flex>
            </Flex>
          </Container>
  )
}

export default Queue