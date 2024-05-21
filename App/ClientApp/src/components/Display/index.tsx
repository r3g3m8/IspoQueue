import React, { useEffect, useState } from 'react'
import { Container, Table } from 'reactstrap'
import styles from './display.module.css'
import fetchQueue from '../../services/fetchQueue';
import axios from "axios";
import moment from "moment/moment";

interface Queue {
    id: string;
    number: string | null;
    creationTime: string;
    timeStart: string | null;
    timeEnd: string | null;
    serviceName: string | null;
    serviceId: number;
    window: string | null;
}
function Display() {
    const [queue, setQueue] = useState<Queue[]>([]);
    const { getQueue } = fetchQueue();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getQueue(); // Замените '/queue' на путь к вашему контроллеру на бэкенде
                setQueue(response);
            } catch (error) {
                console.error('Ошибка при загрузке очереди:', error);
            }
        };

        fetchData();
    }, []);


    const q = queue.length > 0 ? queue.map(q => (
        <tr key={q.id}>
            <td>{q.number}</td>
            <td>{moment(q?.creationTime).format('DD.MM.yyyy HH:mm')}</td>
            <td>{q.serviceName}</td>
            <td>{q?.window}</td>
        </tr>
    )) : <></>

    return (
        <Container>
            <Container>
                <table className={styles.table}>
                    <thead>
                    <tr>
                        <th>№ талона</th>
                        <th>Дата создания</th>
                        <th>Очередь</th>
                        <th>Окно</th>
                    </tr>
                    </thead>
                    <tbody>
                    {q}
                    </tbody>
                </table>
            </Container>
        </Container>
    )
}

export default Display