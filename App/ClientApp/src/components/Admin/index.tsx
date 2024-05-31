import React, { ChangeEvent, useState, useEffect } from 'react'
import { Container } from 'reactstrap'
import Add from '../../public/Add.svg'
import styles from './admin.module.css'
import {Flex, message, notification, Select, Tag} from 'antd'
import MyButton from '../Button'
import Multiselect from 'multiselect-react-dropdown';
import axios, {AxiosError} from "axios";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import CabAndWindows from "./CabAndWindows";

interface Role {
    id: string;
    name: string;
}

interface Service {
    id: number;
    name: string;
    queueName: string | null;
}

interface User {
    id: string;
    firstName: string;
    secondName: string;
    login: string;
    password: string;
    roles: { id: string, name: string }[];
    windows: Window[];
    cabinet: Cabinet;
}

interface Cabinet {
    id: string
    name: string
    windows: Window[] | undefined;
}



function Admin() {
    const [user, setUser] = useState(false)
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState<string>('');
    const [firstName, setFirstName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [windows, setWindows] = useState<Window[]>([]);
    const [cabinets, setCabinets] = useState<Cabinet[]>([]);
    const [selectedCabinet, setSelectedCabinet] = useState<Cabinet | undefined>(undefined)
    const [roles, setRoles] = useState<Role[]>([]);
    const [services, setServices] = useState<Service[]>([]);
    const [selectedServices, setSelectedServices] = useState<Service[]>([]);
    const [selectedRoles, setSelectedRoles] = useState<Role[]>([]);
    const [selectedWindows, setSelectedWindows] = useState<Window[]>([]);
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

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
        } catch (err) {
            const error = err as AxiosError<{ message?: string; status?: string }>;
            if (error.response && error.response.data) {
                showError(`Произошла ошбика при получени пользователей: ${error.response.data?.message}`);
            } else {
                showError('Возникла непредвиденная ошибка при получении пользователей. Попробуйте снова!');
            }
        }
    };

    const fetchRoles = async () => {
        try {
            const response = await axios.get('/api/Data/roles');
            console.log(response.data);
            setRoles(response.data);
        } catch (err) {
            const error = err as AxiosError<{ message?: string; status?: string }>;
            if (error.response && error.response.data) {
                showError(`Произошла ошбика при получени ролей: ${error.response.data?.message}`);
            } else {
                showError('Возникла непредвиденная ошибка при получении ролей. Попробуйте снова!');
            }
        }
    };

    const fetchCabinets = async () => {
        try {
            const response = await axios.get('/api/Cabinet');
            console.log(response.data);
            setCabinets(response.data);
        } catch (err) {
            const error = err as AxiosError<{ message?: string; status?: string }>;
            if (error.response && error.response.data) {
                showError(`Произошла ошбика при получени кабинетов: ${error.response.data?.message}`);
            } else {
                showError('Возникла непредвиденная ошибка при получении кабинетов. Попробуйте добавить кабинет!');
            }

        }
    };

    const fetchServices = async () => {
        try {
            const response = await axios.get('/api/Data/services');
            setServices(response.data);
        } catch (err) {
            const error = err as AxiosError<{ message?: string; status?: string }>;
            if (error.response && error.response.data) {
                showError(`Произошла ошбика при получени услуг: ${error.response.data?.message}`);
            } else {
                showError('Возникла непредвиденная ошибка при получении услуг. Попробуйте снова!');
            }
        }
    };

    const fetchWindowsByCabinet = async (cabinetId: string) => {
        try {
            const response = await fetch(`/api/Window/cabinetWindows/${cabinetId}`)
            const data = await response.json()
            setWindows(data)
        } catch (err) {
            const error = err as AxiosError<{ message?: string; status?: string }>;
            if (error.response && error.response.data) {
                showError(`Произошла ошбика при получени окон: ${error.response.data?.message}`);
            } else {
                showError('Возникла непредвиденная ошибка при получении окон. Попробуйте добавить окна к кабинету!');
            }
        }
    }

    const handleRoleChange = (selectedList: Role[]) => {
        setSelectedRoles(selectedList)
    }

    const handleCabinetChange = async (value: string) => {
        console.log(value);
        setSelectedCabinet({id: value, name: "", windows: []})
        setSelectedWindows([]);
        await fetchWindowsByCabinet(value)
    }

    const handleWindowChange = (selectedList: Window[]) => {
        setSelectedWindows(selectedList)
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!login || !selectedRoles) {
            setFormErrors({
                login: !login ? 'Логин обязателен' : '',
                roles: selectedRoles.length === 0 ? 'Роль обязательна' : '',
            });
            if(!selectedUser)
                setFormErrors((prev) => ({
                    ...prev,
                    password: !password ? 'Пароль обязателен' : '',
                }))
            if(selectedUser && isOperatorSelected || selectedWindows || selectedCabinet) {
                setFormErrors((prev) => ({
                    ...prev,
                    password: !password ? 'Пароль обязателен' : '',
                    windows: isOperatorSelected && selectedWindows.length === 0 ? 'Окно обязательно' : '',
                    cabinet: isOperatorSelected && selectedCabinet === undefined ? 'Кабинет обязателен' : '',
                }))
            }
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
                await fetchUsers();
            } else {
                showError('Возникла непредвиденная ошибка при удалении пользователя. Попробуйте снова!');
            }
        } catch (err) {
            const error = err as AxiosError<{ message?: string; status?: string }>;
            if (error.response && error.response.data) {
                showError(`Произошла ошбика при добавлении пользователя: ${error.response.data?.message}`);
            } else {
                showError('Возникла непредвиденная ошибка при добавлении пользователя. Попробуйте снова!');
            }
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
            if (response.status === 204 || response.status == 200) {
                message.success('Пользователь успешно удален');
                fetchUsers();
            } else {
                showError(`Перезагрузите страницу`);
            }
        } catch (err) {
            const error = err as AxiosError<{ message?: string; status?: string }>;
            if (error.response && error.response.data) {
                showError(`${error.response.data?.message}`);
            } else {
                showError('Возникла непредвиденная ошибка при удалении пользователя. Попробуйте снова!');
            }
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
        setSelectedServices([]);
        setUser(!user);
    };

    // Условие для отображения дополнительных полей
    const isOperatorSelected = selectedRoles.some(role => role.name.includes('Оператор'));
    
    useEffect(() => {
        if(!isOperatorSelected){
            setSelectedCabinet(undefined);
        }
        const operatorRole = selectedRoles.some(role => role.name.includes('Оператор'));
        if (operatorRole) 
        {
            if (selectedRoles.length > 0) {
                const roleIds = selectedRoles.map(role => role.id);
                const params = new URLSearchParams();
                roleIds.forEach(id => params.append('roleId', id));

                fetch(`/api/Data/servicesByRoles?${params.toString()}`)
                    .then(response => response.json())
                    .then(data => {
                        setSelectedServices(data);
                    })
                    .catch(error => console.error('Error fetching services by roles:', error));
            } else {
                setSelectedServices([]);
            }
        }
    }, [selectedRoles])

    const roleBodyTemplate = (rowData) => {
        return rowData.roles.map(role => (
            <Tag color='#319f42' key={role.id} style={
                {fontSize: '14px',
                    padding: '0.5rem',
                    borderRadius: '15px'}
            }>
                {role.name}
            </Tag>
        ));
    };
    
    const windowBodyTemplate = (rowData) => {
        return rowData.windows.map(window => (
            <Tag color='#319f42' key={window.id} style={
                {fontSize: '14px',
                    padding: '0.5rem',
                    borderRadius: '15px'}
            }>
                {window.name}
            </Tag>
        ));
    };

    const editButtonTemplate = (rowData) => {
        return (
            <MyButton
                outline
                onClick={() => handleEditUser(rowData)}>
                Изменить
            </MyButton>
        );
    };

    const deleteButtonTemplate = (rowData) => {
        return (
            <MyButton
                onClick={() => handleDeleteUser(rowData.id)}
                destructive>
                Удалить
            </MyButton>
        );
    };

    return (
        <Container>
            <h1>Панель управления</h1>
            <Container className='p-0'>
                <h3>Управление пользователями</h3>
                <MyButton outline={!user} destructive={user} onClick={handleAddUser}>
                    {!user ? ( <Flex justify={"center"} align={"center"}>
                            <p className={styles.textAdd}>Добавить пользователя</p>
                            <img className={styles.image} src={Add} width={35}></img>
                    </Flex>)
                    : 'Закрыть форму'}
                </MyButton>
                
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
                            <label>{selectedUser ? "Нельзя изменить пароль" : "Пароль:"}</label>
                            <input type="password" disabled={!!selectedUser} value={password} onChange={(e) => setPassword(e.target.value)} />
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
                        {formErrors.roles && <span className={styles.error}>{formErrors.roles}</span>}
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
                                {formErrors.windows && <span className={styles.error}>{formErrors.windows}</span>}
                            </div>
                            <label>Очереди:</label>
                            {selectedServices.map(service => (
                                <Tag color='#319f42' key={service.id} style={
                                    {fontSize: '14px',
                                    padding: '0.5rem',
                                    borderRadius: '15px'}
                                }>
                                    {service.name}
                                </Tag>
                            ))}
                        </div>
                    )}
                    <MyButton submit>{selectedUser ? 'Изменить пользоваетля' : 'Добавить пользователя'}</MyButton>
                </form>}
            </Container>

            {users && <>
                <h3>Список пользователей</h3>
                <DataTable value={users} responsiveLayout="scroll">
                    <Column field="firstName" header="Имя" body={(data) => data.firstName ? `${data.firstName}` : ''} sortable></Column>
                    <Column field="secondName" header="Фамилия" body={(data) => data.secondName ? `${data.secondName}` : ''} sortable></Column>
                    <Column field="login" header="Логин" body={(data) => `${data.login}`} sortable></Column>
                    <Column field="roles" header="Роли" body={roleBodyTemplate} sortable></Column>
                    <Column field="cabinet" header="Кабинет" body={(data) => data.cabinet ? `${data.cabinet.name}` : ''} sortable></Column>
                    <Column field="windows" header="Окна" body={windowBodyTemplate} sortable></Column>
                    <Column body={editButtonTemplate} header="Изменить"></Column>
                    <Column body={deleteButtonTemplate} header="Удалить"></Column>
                </DataTable>      
            </>}
            <CabAndWindows/>
        </Container>
    )
}

export default Admin
