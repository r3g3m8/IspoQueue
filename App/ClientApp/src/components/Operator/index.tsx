import React, { useEffect, useState } from 'react'
import { Container } from 'reactstrap'
import NextImage from '../../public/Next.svg'
import styles from '../Display/display.module.css'
import axios, {AxiosError} from 'axios'
import Button from "../Button";
import {Card, message, notification} from "antd";
import moment from "moment";
import Statuses from 'src/enums/Statuses'
import fetchQueue from "../../services/fetchQueue";
import {Guid} from "guid-typescript";
import User from 'src/interfaces/User'

interface Queue {
    id: Guid;
    number: string | null;
    timeStart: Date | null;
    statusId: number;
    serviceName: string;
}

type props = {
    user: User | null;
}
interface Service {
    id: number;
    name: string;
}

function Operator(props: props) {
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [next, setNext] = useState<Queue | null>(null);
    const [complete, setComplete] = useState(false);
    const [remainingTime, setRemainingTime] = useState(0); // Время в секундах (2 минуты)
    const { deleteTicket, deferTicket } = fetchQueue();
    const [services, setServices] = useState<Service[]>([]);
    const [queue, setQueue] = useState<Queue[]>([]);

    const showError = (errorMessage: string) => {
        notification.error({
            message: 'Ошибка',
            description: errorMessage,
            className: 'custom-notification',
            style: {
                marginTop: '20vh', // Позиционирование сверху
            },
        });
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(`/api/queue/get`, {
                params: {
                    UserId: props.user?.id,
                }});
            setQueue(response.data);
        } catch (err) {
            const error = err as AxiosError<{ message?: string; status?: string }>;
            console.log(error?.response);
            if (error.response && error.response.data) {
                message.error(`${error.response.data?.message}`);
            } else {
                message.error('Возникла непредвиденная ошибка при получении очереди оператора. Попробуйте снова!');
            }
        }
    };

    const fetchServices = async () => {
        try {
            if (props.user == null)
                return;
            console.log(props.user);
            const roleIds = props.user.roles.map(role => role.id);
            const params = new URLSearchParams();
            roleIds.forEach(id => params.append('roleId', id));
            fetch(`/api/Data/servicesByRoles?${params.toString()}`)
                .then(response => response.json())
                .then(data => {
                    setServices(data);
                })
                .catch(error => console.error('Error fetching services by roles:', error));
        } catch (err) {
            const error = err as AxiosError<{ message?: string; status?: string }>;
            if (error.response && error.response.data) {
                showError(`${error.response.data?.message}`);
            } else {
                showError('Возникла непредвиденная ошибка при получении очереди оператора. Попробуйте снова!');
            }
        }
    };

    useEffect(() => {
        
        console.log(props.user)
        if(props.user == null)
            return;
        fetchData();
        fetchServices()
    }, []);

    useEffect(() => {
        if (queue.length > 0) {
            const activeItem = queue.find(q => q.statusId === Statuses.Active);
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

    async function handleNext(userId: string | null): Promise<void> {
        try {
            const response = await axios.put('/api/Queue', {userId})
            console.log(response.data);
            setIsTimerActive(true);
            setRemainingTime(10); // Сброс времени на начальное значение
            setNext(response.data);
            setComplete(true);
            await fetchData();
        } catch (err) {
            const error = err as AxiosError<{ message?: string; status?: string }>;
            if (error.response && error.response.data) {
                showError(`${error.response.data?.message}`);
            } else {
                showError('Возникла непредвиденная ошибка при получении новой заявки. Попробуйте снова!');
            }
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
            await deferTicket(next.id);
            setNext(null);
            setComplete(false);
            await fetchData();
        }
    };

    const queueData = queue.length > 0 ? queue.map((q) => {
        return <tr key={q.id.toString()}>
            <td>{q.number}</td>
            <td>{q.serviceName}</td>
            <td className={q.statusId === Statuses.Completed ?
                styles.completed : q.statusId === Statuses.Active ?
                    styles.active : styles.waiting}>{Statuses[q.statusId]}</td>
        </tr>
    }) : <></>

   
    
    return (
        <Container>
            <h1>Вы оператор, который работает с очередью:</h1>
            <ul>
                {services.map((s) => {
                    return <>
                        <li key={s.id}>{s.name}</li>
                    </>
                })}
            </ul>
            <Container className='w-50 m-0 p-0'>
                {!isTimerActive && !complete ? <Button onClick={() => handleNext(props.user!.id)} next>
                    Следующий <img src={NextImage} width={35} className='mx-2'></img>
                </Button> : <Button disabled>Осталось времени: {remainingTime}</Button>}
            </Container>
            {next && 
                <Card>
                    <h5>Текущая заявка:</h5>
                    <table className={styles.table}>
                        <tbody>
                            <tr>
                                <td>{next?.number}</td>
                                <td>{moment(next?.timeStart).format('DD.MM HH:mm')}</td>
                                <td>{next.serviceName}</td>
                            </tr>
                        </tbody>
                    </table>
                </Card>
                }
            
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