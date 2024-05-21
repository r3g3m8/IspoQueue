import React, { ChangeEvent, useState, useEffect } from 'react'
import { Container } from 'reactstrap'
import Add from '../../public/Add.svg'
import styles from './admin.module.css'
import { Flex } from 'antd'
import Button from '../Button'
import Multiselect from 'multiselect-react-dropdown';
import axios from "axios";

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
    roles: string[];
    windows: { id: string, name: string }[];
}

function Admin() {
    const [user, setUser] = useState(false)
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [cabinet, setCabinet] = useState('');
    const [window, setWindow] = useState('');
    const [queues, setQueues] = useState<string[]>([]);
    const [roles, setRoles] = useState<Role[]>([]);
    const [services, setServices] = useState<Service[]>([]);
    const [selectedRoles, setSelectedRoles] = useState<string[]>([])
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

    const cities: Queue[] = [
        { main: "Подача документов", name: 'Заполнение заявления в личном кабинете'},
        { main: "Подача документов", name: 'Оформление личного дела',},
        { main: "Консультации", name: 'Консультация по выбору специальностей' },
        { main: "Консультации", name: 'Изменение приоритетов' },
        {
            main: "Прием оригиналов документов об образовании/Выдача документов",
            name: 'Прием оригиналов документов об образовании/Выдача документов',
        },
    ];

    useEffect(() => {
        fetchUsers();
        fetchRoles();
        fetchServices();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('/api/user');
            setUsers(response.data);
        } catch (error) {
            console.error('Ошибка при получении пользователей:', error);
        }
    };

    const fetchRoles = async () => {
        try {
            const response = await axios.get('/api/Data/roles');
            setRoles(response.data);
        } catch (error) {
            console.error('Ошибка при получении ролей:', error);
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

    const handleRoleChange = (selectedList: Role[]) => {
        setSelectedRoles(selectedList.map(role => role.id))
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
            roles,
            cabinet,
            window,
            queues
        };

        try {
            console.log(selectedUser?.id);
            const response = selectedUser
                ? await axios.put(`/api/User/${selectedUser.id}`, requestBody)
                : await axios.post('/api/users', requestBody);

            if (response.status === 200 || response.status === 204) {
                alert('Пользователь успешно добавлен/обновлен');
                setLogin('');
                setPassword('');
                setFirstName('');
                setSecondName('');
                setWindow('');
                setUser(false);
                fetchUsers();
            } else {
                alert(`Ошибка: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Произошла ошибка при добавлении/обновлении пользователя');
        }
    };

    const handleEditUser = (user: User) => {
        setSelectedUser(user);
        setLogin(user.login);
        setPassword(''); // Не заполняйте пароль
        setFirstName(user.firstName);
        setSecondName(user.secondName);
        setWindow(user.windows[0]?.name || '');
        setCabinet(user.windows[0]?.name || '');
        setUser(true);
    };

    const handleDeleteUser = async (id: string) => {
        try {
            const response = await axios.delete(`/api/users/${id}`);
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
        //setRole('');
        setWindow('');
        setCabinet('');
        setQueues([]);
        setUser(!user);
    };

    const handleNumericInputChange = (value: string, setter: React.Dispatch<React.SetStateAction<string>>) => {
        const newValue = value.replace(/\D/g, ''); // Удаляем все, кроме цифр
        setter(newValue);
    };

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
                        <div className={styles.formGroup}>
                            <label>Роли:</label>
                            <Multiselect
                                options={roles}
                                selectedValues={roles.filter(role => selectedRoles.includes(role.id))}
                                onSelect={handleRoleChange}
                                onRemove={handleRoleChange}
                                displayValue='name'
                            />
                        </div>
                    </Flex>
                    
                    {roles && (
                        <div className={styles.formGroup}>
                            <Flex>
                                <div className={styles.formGroup}>
                                    <label>Кабинет:</label>
                                    <input type="text" inputMode='numeric' value={cabinet} onChange={(e) => handleNumericInputChange(e.target.value, setCabinet)} pattern="[0-9]*" />
                                    {formErrors.cabinet && <span className={styles.error}>{formErrors.cabinet}</span>}
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Окно:</label>
                                    <input type="text"
                                           value={window}
                                           onChange={(e) => handleNumericInputChange(e.target.value, setWindow)}
                                           pattern="[0-9]*"
                                           inputMode="numeric" />
                                    {formErrors.window && <span className={styles.error}>{formErrors.window}</span>}
                                </div>
                            </Flex>
                            <label>Очереди:</label>
                            <Multiselect
                                options={services.map((service) => ({ main: service.queueName, name: service.name }))}
                                groupBy="main"
                                onSelect={(selectedList) => setQueues(selectedList.map((queue: Queue) => queue.name))}
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
                    <Button submit>Добавить пользователя</Button>
                </form>}
            </Container>

            {users && <>
                <h3>Список пользователей</h3>
                <ul>
                    {users.map(user => (
                        <li key={user.id}>
                            {user.firstName} {user.secondName} ({user.login}) {user.roles}
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
