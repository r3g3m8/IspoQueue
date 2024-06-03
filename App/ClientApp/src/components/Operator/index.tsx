import React, { useEffect, useState } from 'react'
import { Container } from 'reactstrap'
import NextImage from '../../public/Next.svg'
import styles from '../Display/display.module.css'
import axios, {AxiosError} from 'axios'
import Button from "../Button";
import {Card, Flex, List, message, notification, Space, Switch} from "antd";
import moment from "moment";
import Statuses from 'src/enums/Statuses'
import fetchQueue from "../../services/fetchQueue";
import {Guid} from "guid-typescript";
import User from 'src/interfaces/User'
import Cabinet from "../../interfaces/Cabinet";
import Windows from "../../interfaces/WIndows";

interface Queue {
    id: Guid;
    number: string | null;
    timeStart: Date | null;
    statusId: number;
    serviceName: string;
    window: string;
}

type props = {
    user: User | null;
}
interface Service {
    id: number;
    name: string;
}

function Operator(props: props) {
    const [next, setNext] = useState<Queue | null>(null);
    const [complete, setComplete] = useState(false);
    const { deleteTicket, deferTicket } = fetchQueue();
    const [services, setServices] = useState<Service[]>([]);
    const [queue, setQueue] = useState<Queue[]>([]);
    const [cabinet, setCabinet] = useState<Cabinet | null>(null);
    const [hasActiveWindows, setHasActiveWindows] = useState(false);

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
        if(props.user == null){
            localStorage.removeItem("token");
            window.location.href = '/login';
            return;
        }
           
        setCabinet(props.user.cabinet);
        fetchData();
        fetchServices()
        checkActiveWindows();
    }, []);

    useEffect(() => {
        const windowNames = props.user?.windows?.map((w: Windows) => w.name);
        if (queue.length > 0 && windowNames != null) {
            const activeItem = queue.find((q: Queue) => q.statusId === Statuses.Активен && windowNames.includes(q.window));
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

    async function handleNext(userId: string | null): Promise<void> {
        try {
            const response = await axios.put('/api/Queue', {userId})
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

    const checkActiveWindows = () => {
        if (props.user && props.user.windows) {
            const activeWindows = props.user.windows.some((w: Windows) => w.isActive);
            setHasActiveWindows(activeWindows);
        }
    };

    const handleWindowStatusChange = async (windowId: string, isActive: boolean) => {
        try {
            const data = {
                Id: windowId,
                Name: null,
                IsActive: isActive,
            }
            const response = await axios.put(`/api/Window/${windowId}`, data);
            if(response.status == 200) {
                message.success('Статус окна обновлен успешно');
                checkActiveWindows();
                window.location.reload();
            }
        } catch (err) {
            const error = err as AxiosError<{ message?: string; status?: string }>;
            if (error.response && error.response.data) {
                showError(`${error.response.data?.message}`);
            } else {
                showError('Возникла непредвиденная ошибка при обновлении статуса окна. Попробуйте снова!');
            }
        }
    };

    const queueData = queue.length > 0 ? queue.map((q) => {
        return <tr key={q.id.toString()}>
            <td>{q.number}</td>
            <td>{q.serviceName}</td>
            <td className={q.statusId === Statuses.Завершен ?
                styles.completed : q.statusId === Statuses.Активен ?
                    styles.active : styles.waiting}>{Statuses[q.statusId]}</td>
        </tr>
    }) : <></>

    return (
        <Container>
            <Flex justify={"space-between"}>
                <Flex vertical>
                    <div >
                        <h1 key={props.user?.id}>Вы оператор, который работает с очередью:</h1>
                        <ul>
                            {services.map((s) => {
                                return <>
                                    <li key={s.id}>{s.name}</li>
                                </>
                            })}
                        </ul>
                    </div>
                    <Container className='w-50 m-0 p-0'>
                        {hasActiveWindows ? (
                            !complete ? (
                                <Button onClick={() => handleNext(props.user!.id)} next>
                                    Следующий <img src={NextImage} width={35} className='mx-2'></img>
                                </Button>
                            ) : (
                                <Button disabled>Чтобы вызвать следующего абитуриента - отожите или завершите текущую заявку</Button>
                            )
                        ) : (
                            <p>Нет активных окон. Пожалуйста, активируйте хотя бы одно окно, чтобы продолжить работу</p>
                        )}
                    </Container>
                </Flex>
                
                <div>
                    {cabinet && props.user && (
                        <>
                            <h3>Кабинет и окна:</h3>
                            <Card key={cabinet.id} title={`Кабинет: ${cabinet.name}`} style={{ border: '1px solid #319F42' }}>
                                <List
                                    dataSource={props.user.windows}
                                    renderItem={(window) => (
                                        <List.Item key={window.id.toString()}>
                                            <Space>
                                                {window.name}
                                                <Switch
                                                    title={"Активность"}
                                                    checked={window.isActive}
                                                    onChange={(checked) => handleWindowStatusChange(window.id, checked)}
                                                />
                                            </Space>
                                        </List.Item>
                                    )}
                                />
                            </Card>
                        </>
                        
                    )}
                </div>
            </Flex>
           
            
            {next && 
                <Card style={{ border: '1px solid #319F42', marginTop: '1rem' }}>
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
            <h3 className={styles.align}>Ход очереди</h3>
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