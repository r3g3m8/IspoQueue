import React, { useEffect, useState } from 'react'
import { Container } from 'reactstrap'
import Button from '../Button/index.tsx'
import NextImage from '../../public/Next.svg'
import styles from '../Display/display.module.css'
import axios from 'axios'

interface Queue {
    id: string;
    number: string | null;
    status: string | null;
    serviceId: number;
}
function Operator() {
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [next, setNext] = useState();
    const [complete, setComplete] = useState(false);
    const [remainingTime, setRemainingTime] = useState(10); // Время в секундах (2 минуты)
    const userId = '01234567-89ab-cdef-0123-456789abcdef';

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
        fetchData();
    }, [next]);

    const queueData = queue.length > 0 ? queue.map((q) => {
        return <tr key={q.id}>
            <td>{q.number}</td>
            <td>{q.serviceId}</td>
            <td className={q.status == "Завершен" ?
                styles.completed : q.status == "Активен" ?
                    styles.active : styles.waiting}>{q.status}</td>
        </tr>
    }) : <></>

    const textNext = () => {
        return <>
            <p>Следуюший</p>
            <img src={NextImage} width={40}></img>
        </>
    }
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
        } catch (error) {
            console.error('Ошибка при загрузке очереди:', error);
        }
    }

    const handleComplete = () => {
        setComplete(true);
        // Завершение заявки
        // Удаление axios.delete
    };
    const handleDefer = () => {
        // Отложить заявку, откинуть в конец очереди
    };
    return (
        <Container>
            <h1>Вы опреатор который работает с очередю:</h1>
            <ul>
                <li>{isTimerActive}</li>
            </ul>
            <Container className='w-50 m-0 p-0'>
                {!isTimerActive ? <Button Button onClick={() => handleNext(userId)} next>
                    Следующий <img src={NextImage} width={35} className='mx-2'></img>
                </Button> : <Button disabled>Осталось времени: {remainingTime}</Button>}
            </Container>
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
            <Button onClick={handleDefer}>Отложить</Button>
            <Button onClick={handleComplete}>Завершить</Button>
        </Container>
    )
}

export default Operator