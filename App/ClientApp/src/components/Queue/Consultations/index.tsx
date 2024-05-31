import React, {useState} from 'react';
import { Container } from 'reactstrap';
import {Flex, Modal} from 'antd';
import Button from '../../Button';
import Back from '../../../public/Back.svg'
import { useNavigate } from 'react-router-dom';
import fetchQueue from "../../../services/fetchQueue";
import AllServices from 'src/enums/AllServices';

function Consultations() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [ticketNumber, setTicketNumber] = useState('');
    const [serviceName, setServiceName] = useState('');
    const navigate = useNavigate();
    const { addTicket } = fetchQueue();
    const handleAddTicket = async (serviceId: number) =>  {
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
                <h1>Консультации</h1>
                <Flex justify="center" align='center' style={{ width: '100%' }}>
                    <Flex style={{ marginRight: '5rem' }}>
                        <img src={Back} width={90} alt='back' onClick={() => navigate(-1)}></img>
                    </Flex>
                    <Flex justify="space-between" align="center" vertical style={{ marginRight: '10rem' }}>
                        <Button onClick={() => handleAddTicket(
                            AllServices["Консультация по выбору специальностей"])} 
                                queue>Консультация по выбору специальностей</Button>
                        <Button onClick={() => handleAddTicket(
                            AllServices["Изменение приоритетов"])} 
                                queue>Изменение приоритетов</Button>
                    </Flex>
                </Flex>
                <Modal
                    title="Ваш талон"
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleOk}
                    width={700}
                    style={{fontSize: '22px'}}
                >
                    <p>Номер: <b>{ticketNumber}</b></p>
                    <p>Очередь: <b>{serviceName}</b></p>
                </Modal>
            </Container>
        </div>
    )
}

export default Consultations