import React, { ChangeEvent, useState, useEffect } from 'react'
import { Container } from 'reactstrap'
import Add from '../../public/Add.svg'
import styles from './admin.module.css'
import { Flex, Select } from 'antd'
import Button from '../Button'
import Multiselect from 'multiselect-react-dropdown';
import axios, {AxiosError} from "axios";
import {Guid} from "guid-typescript";

interface Queue {
    main: string;
    name: string;
}

interface Role {
    id: string;
    name: string;
}

interface Service {
    id: number;
    name: string;
    queueName: string;
}

interface User {
    id: string;
    firstName: string;
    secondName: string;
    login: string;
    password: string;
    roles: { id: string, name: string }[];
    windows: { id: string, name: string }[];
    cabinet: { id: string, name: string };
}

interface Cabinet {
    id: string
    name: string
}

interface Window {
    id: string;
    name: string;
}

function Admin() {
    const [user, setUser] = useState(false)
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [windows, setWindows] = useState<Window[]>([]);
    const [cabinets, setCabinets] = useState<Cabinet[]>([]);
    const [selectedCabinet, setSelectedCabinet] = useState<Cabinet | undefined>(undefined)
    const [selectedQueues, setSelectedQueues] = useState<string[]>([]);
    const [roles, setRoles] = useState<Role[]>([]);
    const [services, setServices] = useState<Service[]>([]);
    const [selectedRoles, setSelectedRoles] = useState<Role[]>([])
    const [selectedWindows, setSelectedWindows] = useState<Window[]>([])
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        fetchUsers();
        fetchRoles();
        fetchServices();
        fetchCabinets();
    }, []);

    useEffect(()=>{
        if (selectedUser){
            setSelectedRoles(selectedUser.roles)
            setSelectedWindows(selectedUser.windows)
            setSelectedCabinet(selectedUser.cabinet)
        }
    }, [selectedUser])

    const fetchUsers = async () => {
        try {
            const response = await axios.get('/api/user');
            console.log(response.data);
            setUsers(response.data);
        } catch (error) {
            console.error('Ошибка при получении пользователей:', error);
        }
    };

    const fetchRoles = async () => {
        try {
            const response = await axios.get('/api/Data/roles');
            console.log(response.data);
            setRoles(response.data);
        } catch (error) {
            console.error('Ошибка при получении ролей:', error);
        }
    };

    const fetchCabinets = async () => {
        try {
            const response = await axios.get('/api/Data/cabinets');
            console.log(response.data);
            setCabinets(response.data);
        } catch (error) {
            console.error('Ошибка при получении пользователей:', error);
        }
    };

    const fetchServices = async () => {
        try {
            const response = await axios.get('/api/Data/services');
            setServices(response.data);
        } catch (error) {
            console.error('Ошибка при получении услуг:', error);
        }
    };

    const fetchWindowsByCabinet = async (cabinetId: string) => {
        try {
            const response = await fetch(`/api/Data/cabinetWindows/${cabinetId}`)
            if (!response.ok) {
                throw new Error(`Ошибка: ${response.statusText}`)
            }
            const data = await response.json()
            setWindows(data)
        } catch (error) {
            console.error('Ошибка при получении окон:', error)
        }
    }

    const handleRoleChange = (selectedList: Role[]) => {
        setSelectedRoles(selectedList)
    }

    const handleCabinetChange = async (value: string) => {
        console.log(value);
        setSelectedCabinet({id: value, name: ""})
        setSelectedWindows([]);
        await fetchWindowsByCabinet(value)
    }

    const handleWindowChange = (selectedList: Window[]) => {
        setSelectedWindows(selectedList)
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!selectedUser?.id && !login || !password ) {
            setFormErrors({
                login: !login ? 'Логин обязателен' : '',
                password: !password ? 'Пароль обязателен' : '',
                roles: roles.length === 0 ? 'Роль обязательна' : '',
                //windows: roles.includes('operator') && windows.length === 0 ? 'Окно обязательно' : '',
                //queues: roles.includes('operator') && queues.length === 0 ? 'Очередь обязательна' : ''
            });
            return;
        }

        const requestBody = {
            firstName,
            secondName,
            login,
            password,
            roles: selectedRoles,
            windows: selectedWindows,
            cabinet: selectedCabinet
        };

        try {
            console.log(requestBody);
            const response = selectedUser
                ? await axios.put(`/api/User/${selectedUser.id}`, requestBody)
                : await axios.post('/api/User/add', requestBody);

            if (response.status === 200 || response.status === 204) {
                alert('Пользователь успешно добавлен/обновлен');
                setLogin('');
                setPassword('');
                setFirstName('');
                setSecondName('');
                setUser(false);
                fetchUsers();
            } else {
                alert(`Ошибка: ${response.statusText}`);
            }
        } catch (error) {
            const err = error as AxiosError;
            console.error('Ошибка:', err.response?.data);
            alert('Произошла ошибка при добавлении/обновлении пользователя');
        }
    };

    const handleEditUser = (user: User) => {
        setSelectedUser(user);
        setLogin(user.login);
        setPassword(''); // Не заполняйте пароль
        setSelectedRoles(user.roles);
        setFirstName(user.firstName);
        setSecondName(user.secondName);
        setSelectedWindows(user.windows)
        setUser(true);
    };

    const handleDeleteUser = async (id: string) => {
        try {
            const response = await axios.delete(`/api/user/${id}`);
            if (response.status === 204) {
                alert('Пользователь успешно удален');
                fetchUsers();
            } else {
                alert(`Ошибка: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Ошибка при удалении пользователя:', error);
            alert('Произошла ошибка при удалении пользователя');
        }
    };

    const handleAddUser = () => {
        setSelectedUser(null);
        setLogin('');
        setPassword('');
        setFirstName('');
        setSecondName('');
        setSelectedCabinet(undefined);
        setSelectedRoles([]);
        setSelectedWindows([]);
        setSelectedQueues([]);
        setUser(!user);
    };

    // Условие для отображения дополнительных полей
    const isOperatorSelected = selectedRoles.some(role => role.name.includes('Оператор'));
    
    useEffect(() => {
        if(!isOperatorSelected){
            setSelectedCabinet(undefined);
        }
    }, [selectedRoles])

    return (
        <Container className='d-flex flex-column align-items-center justify-content-center'>
            <h1>Панель управления</h1>
            <Container className='p-0'>
                <h3>Управление операторами</h3>
                <img className={styles.image} src={Add} onClick={handleAddUser} width={60}></img>
                {user && <form className={styles.addUserForm} onSubmit={handleSubmit}>
                    <Flex justify='space-between'>
                        <div className={styles.formGroup}>
                            <label>Имя:</label>
                            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Фамилия:</label>
                            <input type="text" value={secondName} onChange={(e) => setSecondName(e.target.value)} />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Логин:</label>
                            <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} />
                            {formErrors.login && <span className={styles.error}>{formErrors.login}</span>}
                        </div>
                        <div className={styles.formGroup}>
                            <label>Пароль:</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            {formErrors.password && <span className={styles.error}>{formErrors.password}</span>}
                        </div>
                        
                    </Flex>
                    <div className={styles.formGroup}>
                        <label>Роли:</label>
                        <Multiselect
                            options={roles.filter(r => r.name)}
                            selectedValues={selectedRoles}
                            onSelect={handleRoleChange}
                            onRemove={handleRoleChange}
                            displayValue='name'
                            placeholder='Выберите роли'
                            showCheckbox
                            className={styles.multiSelectContainer}
                            style={{
                                chips: {
                                    background: '#319f42'
                                },
                                searchBox: {
                                    border: 'none',
                                    padding: '0'
                                }
                            }}
                        />
                    </div>
                    {isOperatorSelected && (
                        <div className={styles.formGroup}>
                            <Flex>
                                <div className={styles.formGroup}>
                                    <label>Кабинет:</label>
                                    <Select
                                        value={selectedCabinet?.id}
                                        onChange={handleCabinetChange}
                                        placeholder='Выберите кабинет'
                                        style={{ width: '100%' }}
                                    >
                                        {cabinets.map(cabinet => (
                                            <Select.Option key={cabinet.id} value={cabinet.id}>
                                                {cabinet.name}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                    {formErrors.cabinet && <span className={styles.error}>{formErrors.cabinet}</span>}
                                </div>
                               
                            </Flex>
                            <div className={styles.formGroup}>
                                <label>Окна:</label>
                                <Multiselect
                                    options={windows.filter(w => w.name)}
                                    selectedValues={selectedWindows}
                                    onSelect={handleWindowChange}
                                    onRemove={handleWindowChange}
                                    displayValue='name'
                                    placeholder='Выберите окна'
                                    showCheckbox
                                    className={styles.multiSelectContainer}
                                    style={{
                                        chips: {
                                            background: '#319f42'
                                        },
                                        searchBox: {
                                            border: 'none',
                                            padding: '0'
                                        }
                                    }}
                                />
                                {formErrors.window && <span className={styles.error}>{formErrors.window}</span>}
                            </div>
                            <label>Очереди:</label>
                            <Multiselect
                                options={services.map((service) => ({ main: service.queueName, name: service.name }))}
                                groupBy="main"
                                onSelect={(selectedList) => setSelectedQueues(selectedList.map((queue: Queue) => queue.name))}
                                displayValue="name"
                                placeholder='Выберите очередь'
                                showCheckbox
                                className={styles.multiSelectContainer}
                                style={{
                                    chips: {
                                        background: '#319f42'
                                    },
                                    searchBox: {
                                        border: 'none',
                                        padding: '0'
                                    }
                                }}
                            />
                        </div>
                    )}
                    <Button submit>{selectedUser ? 'Изменить пользоваетля' : 'Добавить пользователя'}</Button>
                </form>}
            </Container>

            {users && <>
                <h3>Список пользователей</h3>
                <ul>
                    {users.map(user => (
                        <li key={user.id}>
                            {user.firstName} {user.secondName} ({user.login}) {user.roles.map(roles => roles.name)}
                            <button onClick={() => handleEditUser(user)}>Изменить</button>
                            <button onClick={() => handleDeleteUser(user.id)}>Удалить</button>
                        </li>
                    ))}
                </ul>            
            </>}
            
        </Container>
    )
}

export default Admin
