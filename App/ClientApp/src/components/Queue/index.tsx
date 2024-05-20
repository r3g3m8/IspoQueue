import { Flex } from 'antd'
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
    const [services, setServices] = useState<IService[]>([]);
    const { addTicket } = fetchQueue();
    const fetchServices = async () => {
        //const data = await getServices();
        //setServices(data);
    };
    const handleAddTicket = async (serviceId: number) => {
        await addTicket(serviceId);
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
          </Container>
  )
}

export default Queue