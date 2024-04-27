import React from 'react';
import { Container } from 'reactstrap';
import { Flex } from 'antd';
import Button from '../../Button/index.tsx';
import Back from '../../../public/Back.svg'
import { useNavigate } from 'react-router-dom';

function Consultations() {
    const navigate = useNavigate();

    return (
        <div>
            <Container className='d-flex flex-column align-items-center justify-content-center'>
                <h1>Консультации</h1>
                <Flex justify="center" align='center' style={{ width: '100%' }}>
                    <Flex style={{ marginRight: '5rem' }}>
                        <img src={Back} width={90} alt='back' onClick={() => navigate(-1)}></img>
                    </Flex>
                    <Flex justify="space-between" align="center" vertical style={{ marginRight: '10rem' }}>
                        <Button queue>Консультация по выбору специальностей</Button>
                        <Button queue>Изменение приоритетов</Button>
                    </Flex>
                </Flex>

            </Container>
        </div>
    )
}

export default Consultations