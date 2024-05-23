import React, { useEffect, useState } from 'react'
import { Container } from 'reactstrap'
import styles from './display.module.css'
import fetchQueue from '../../services/fetchQueue';
import moment from "moment/moment";
import {Flex} from "antd";
import Statuses from "../../enums/Statuses";

interface Queue {
    id: string;
    number: string | null;
    statusId: number;
    window: string | null;
    cabinet: string | null;
}
function Display() {
    const [queue, setQueue] = useState<Queue[]>([]);
    const [activeQueue, setActiveQueue] = useState<Queue[]>([]);
    const { getQueue, getActiveQueue } = fetchQueue();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getQueue();
                const activeRes = await getActiveQueue();// Замените '/queue' на путь к вашему контроллеру на бэкенде
                setQueue(response);
                setActiveQueue(activeRes)
            } catch (error) {
                console.error('Ошибка при загрузке очереди:', error);
            }
        };

        fetchData();
        console.log(queue);
    }, []);

    const waiting = queue.length > 0 ? queue.map(q => (
        <tr key={q.id}>
            <td>{q.number}</td>
            <td>{Statuses[q.statusId]}</td>
        </tr>
    )) : <></>

    const active = activeQueue.length > 0 ? activeQueue.map(q => (
        <tr key={q.id}>
            <td>{q.number}</td>
            <td>{q?.cabinet}</td>
            <td>{q?.window}</td>
        </tr>
    )) : <></>

    return (
        <Container>
            <Flex justify={"space-between"}>
                <div className={styles.queues}>
                    <table className={styles.table}>
                        <thead>
                        <tr>
                            <th>№ талона</th>
                            <th>Статус</th>
                        </tr>
                        </thead>
                        <tbody>
                        {waiting}
                        </tbody>
                    </table>
                </div>
                <div className={styles.queues}>
                    <table className={styles.table}>
                        <thead>
                        <tr>
                            <th>№ талона</th>
                            <th>Кабинет</th>
                            <th>Окно</th>
                        </tr>
                        </thead>
                        <tbody>
                        {active}
                        </tbody>
                    </table>
                </div>
            </Flex>
                
        </Container>
    )
}

export default Display