import { Flex } from 'antd'
import React from 'react'
import { Container } from 'reactstrap'
import Button from '../Button/index.tsx'

function Queue() {
  return (
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
  )
}

export default Queue