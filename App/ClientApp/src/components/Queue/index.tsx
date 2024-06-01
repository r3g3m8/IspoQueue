import {Flex, Modal} from 'antd'
import React, {useState} from 'react'
import { Container } from 'reactstrap'
import Button from '../Button/index'
import fetchQueue from "../../services/fetchQueue";
import AllServices from 'src/enums/AllServices';

interface IService {
    id: number;
    name: string;
    identityStr: string;
}


function Queue() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [ticketNumber, setTicketNumber] = useState('');
    const [serviceName, setServiceName] = useState('');
    const { addTicket } = fetchQueue();
    const fetchServices = async () => {
        //const data = await getServices();
        //setServices(data);
    };
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
        window.location.href = '/';
    };

  return (
    <Container className='d-flex flex-column align-items-center justify-content-center'>
            <h1>Выберите услугу</h1>
            <Flex gap="middle" align="center" vertical>
              <Flex justify="space-between" align="center" vertical>
                <Button href='/submission' queue>Подача документов</Button>
                <Button href='/consultations' queue>Консультации</Button>
                <Button 
                    onClick={() => handleAddTicket(
                        AllServices["Прием оригиналов документов об образовании / Выдача документов"])} 
                    queue>Прием оригиналов документов об образовании / Выдача документов</Button>
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
  )
}

export default Queue