import React, { useEffect, useState } from 'react'
import { Container, Table } from 'reactstrap'
import styles from './display.module.css'
import fetchQueue from '../../services/getQueue.ts';
import axios from "axios";

function Display() {
    let data: { key: string, cabinet: number, window: number }[] = [
        { "key": "П100", "cabinet": 110, "window": 1 },
        { "key": "K200", "cabinet": 115, "window": 1 },
        { "key": "П200", "cabinet": 110, "window": 2 }
    ];

    const [queue, setQueue] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/queue'); // Замените '/queue' на путь к вашему контроллеру на бэкенде
                console.log(response.data);
                setQueue(response.data);
            } catch (error) {
                console.error('Ошибка при загрузке очереди:', error);
            }
        };

        fetchData();
    }, []);


    const q = queue != undefined ? queue.map((q) => {
        return <tr key={q.id}>
            <td>{d.key}</td>
            <td>{d.cabinet}</td>
            <td>{d.window}</td>
        </tr>
    }) : <></>

    return (
        <Container>
            <Container>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>№ талона</th>
                            <th>Кабинет</th>
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