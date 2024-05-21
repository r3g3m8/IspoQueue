import React, { useEffect, useState } from 'react'
import { Container } from 'reactstrap'
import NextImage from '../../public/Next.svg'
import styles from '../Display/display.module.css'
import axios from 'axios'
import Button from "../Button";
import {Flex} from "antd";
import moment from "moment";
import Statuses from 'src/enums/Statuses'
import fetchQueue from "../../services/fetchQueue";
import {Guid} from "guid-typescript";

interface Queue {
    id: Guid;
    number: string | null;
    timeStart: Date | null;
    statusId: number;
    serviceId: number;
}
function Operator() {
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [next, setNext] = useState<Queue | null>(null);
    const [complete, setComplete] = useState(false);
    const [remainingTime, setRemainingTime] = useState(10); // Время в секундах (2 минуты)
    const userId = '01234567-89ab-cdef-0123-456789abcdef';
    const { deleteTicket } = fetchQueue();

    const [queue, setQueue] = useState<Queue[]>([]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`/api/queue/get`, {
                params: {
                    UserId: userId,
                }}); // Замените '/queue' на путь к вашему контроллеру на бэкенде
            console.log(response.data)
            setQueue(response.data);
        } catch (error) {
            console.error('Ошибка при загрузке очереди:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (queue.length > 0) {
            const activeItem = queue.find(q => q.statusId === Statuses.Активен);
            if (activeItem) {
                setNext(activeItem);
                setComplete(true);
            } else {
                setNext(null);
                setComplete(false);
            }
        } else {
            setNext(null);
            setComplete(false);
        }
    }, [queue]);
    
    useEffect(() => {
        let timerInterval;

        // Если таймер активен и осталось время
        if (isTimerActive && remainingTime > 0) {
            // Уменьшаем время каждую секунду
            timerInterval = setTimeout(() => {
                setRemainingTime((prevTime) => prevTime - 1);
            }, 1000);
        } else {
            // Если время вышло или таймер неактивен, очищаем интервал
            clearInterval(timerInterval);
            setIsTimerActive(false);
        }

        // Очищаем интервал при размонтировании компонента
        return () => clearInterval(timerInterval);
    }, [isTimerActive, remainingTime]);

    async function handleNext(userId: string): Promise<void> {
        try {
            const response = await axios.put('/api/queue', {userId})
            setIsTimerActive(true);
            setRemainingTime(10); // Сброс времени на начальное значение
            setNext(response.data);
            setComplete(true);
            await fetchData();
        } catch (error) {
            console.error('Ошибка при загрузке очереди:', error);
        }
    }

    const handleComplete = async () => {
        if (next) {
            await deleteTicket(next.id);
            setQueue(queue.filter(q => q.id !== next.id));
            setNext(null);
            setComplete(false);
            await fetchData();
        }
    };
    const handleDefer = async () => {
        if (next != null) {
            const response = await axios.put(`/api/queue/defer/${next.id}`);
            setNext(null);
            setComplete(false);
            await fetchData();
        }
    };

    const queueData = queue.length > 0 ? queue.map((q) => {
        console.log(q.id);
        return <tr key={q.id.toString()}>
            <td>{q.number}</td>
            <td>{q.serviceId}</td>
            <td className={q.statusId === Statuses.Заврешен ?
                styles.completed : q.statusId === Statuses.Активен ?
                    styles.active : styles.waiting}>{Statuses[q.statusId]}</td>
        </tr>
    }) : <></>
    
    return (
        <Container>
            <h1>Вы опреатор который работает с очередю:</h1>
            <ul>
                <li>{"Констультации"}</li>
            </ul>
            <Container className='w-50 m-0 p-0'>
                {!isTimerActive && !complete ? <Button onClick={() => handleNext(userId)} next>
                    Следующий <img src={NextImage} width={35} className='mx-2'></img>
                </Button> : <Button disabled>Осталось времени: {remainingTime}</Button>}
            </Container>
            {next && 
                <Flex>
                <p>{next?.number} </p><br/>
                <div>
                    <p>{moment(next?.timeStart).format('DD.mm.yyyy HH:mm')}</p>
                </div>
                <p> {Statuses[next.statusId || 0]}</p>
            </Flex>}
            
            <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>№ талона</th>
                            <th>Очередь</th>
                            <th>Статус</th>
                        </tr>
                    </thead>
                    <tbody>
                        {queueData}
                    </tbody>
                </table>
            {complete && <>
                <Button onClick={handleDefer}>Отложить</Button>
                <Button onClick={handleComplete}>Завершить</Button>
            </>
            }
        </Container>
    )
}

export default Operator