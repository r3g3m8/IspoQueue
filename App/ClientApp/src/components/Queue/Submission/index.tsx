import React, {useState} from 'react';
import { Container } from 'reactstrap';
import {Flex, Modal} from 'antd';
import Button from '../../Button';
import Back from '../../../public/Back.svg'
import { useNavigate } from 'react-router-dom';
import fetchQueue from "../../../services/fetchQueue";
import AllServices from 'src/enums/AllServices';

function Submition() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [ticketNumber, setTicketNumber] = useState('');
    const [serviceName, setServiceName] = useState('');
    const navigate = useNavigate();
    const { addTicket } = fetchQueue();

    const handleAddTicket = async (serviceId: number) => {
        const ticket = await addTicket(serviceId);
        if (ticket) {
            setTicketNumber(ticket.number);
            setServiceName(ticket.serviceName);
            setIsModalVisible(true);
        }
    };

    const handleOk = () => {
        setIsModalVisible(false);
        navigate(-1);
    };

    return (
        <div>
            <Container className='d-flex flex-column align-items-center justify-content-center'>
                <h1>Подача документов</h1>
                <Flex gap="middle" align="center">
                    <Flex style={{ marginRight: '5rem' }}>
                        <img src={Back} width={90} alt='back' onClick={() => navigate(-1)}></img>
                    </Flex>
                    <Flex justify="space-between" align="center" vertical style={{ marginRight: '10rem' }}>
                        <Button onClick={() => handleAddTicket(
                            AllServices["Заполнение заявления в личном кабинете"])}
                                queue>Заполнение заявления в личном кабинете</Button>
                        <Button onClick={() => handleAddTicket(
                            AllServices["Оформление личного дела"])}
                                queue>Оформление личного дела</Button>
                    </Flex>
                </Flex>
                <Modal
                    title={<div style={{ fontSize: '24px' }}>Ваш талон</div>}
                    open={isModalVisible}
                    onOk={handleOk}
                    width={700}
                    closable={false}
                    styles={ {body: {fontSize: '24px'}}}
                    footer={[
                        <Button key="ok" onClick={handleOk}>
                            OK
                        </Button>
                    ]}>
                    <p>Номер: <b>{ticketNumber}</b></p>
                    <p>Очередь: <b>{serviceName}</b></p>
                </Modal>
            </Container>
        </div>
    )
}

export default Submition