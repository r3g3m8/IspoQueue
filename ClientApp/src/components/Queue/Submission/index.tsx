import React from 'react';
import { Container } from 'reactstrap';
import { Flex } from 'antd';
import Button from '../../Button/index.tsx';
import Back from '../../../public/Back.svg'
import { useNavigate } from 'react-router-dom';

function Submition() {
    const navigate = useNavigate();

    return (
        <div>
            <Container className='d-flex flex-column align-items-center justify-content-center'>
                <h1>Подача документов</h1>
                <Flex gap="middle" align="center">
                    <Flex style={{ marginRight: '5rem' }}>
                        <img src={Back} width={90} alt='back' onClick={() => navigate(-1)}></img>
                    </Flex>
                    <Flex justify="space-between" align="center" vertical style={{ marginRight: '10rem' }}>
                        <Button queue>Заполнение заявления в личном кабинете</Button>
                        <Button queue>Оформление личного дела</Button>
                    </Flex>
                </Flex>
            </Container>
        </div>
    )
}

export default Submition