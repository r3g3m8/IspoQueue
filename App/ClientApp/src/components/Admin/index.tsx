import React, { ChangeEvent, useState } from 'react'
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

function Admin() {
    const [user, setUser] = useState(false)
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [role, setRole] = useState('');
    const [cabinet, setCabinet] = useState('');
    const [window, setWindow] = useState('');
    const [queues, setQueues] = useState<string[]>([]);
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

    const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setRole(event.target.value);
        if (event.target.value !== 'operator') {
            // Если роль не оператор, сбрасываем значения
            setQueues([]);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!login || !password || !role || (role === 'operator' && (!cabinet || !window))) {
            setFormErrors({ login: !login ? 'Логин обязателен' : '', password: !password ? 'Пароль обязателен' : '', role: !role ? 'Роль обязательна' : '', cabinet: role === 'operator' && !cabinet ? 'Кабинет обязателен' : '', window: role === 'operator' && !window ? 'Окно обязательно' : '' });
            //return;
        }
        // Ваша логика отправки данных на сервер
        console.log({ login, password, role, cabinet, window, queues });

        const requestBody = {
            firstName,
            secondName,
            login,
            password,
            roleId: null,  // Не забудьте преобразовать роль в ID на сервере
            windowId: null
        };

        try {
            const response = await fetch('/api/user/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            const data = await response.json();

            if (response.ok) {
                alert('Пользователь успешно добавлен');
                // Очистить форму
                setLogin('');
                setPassword('');
                setRole('');
                setFirstName('');
                setSecondName('');
                setWindow('');
                setUser(false);
            } else {
                alert(`Ошибка: ${data.message}`);
            }
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Произошла ошибка при добавлении пользователя');
        }
    };

    function handleAddUser(): void {
        setUser(!user)
    }

    function handleNumericInputChange(value: string, setter: React.Dispatch<React.SetStateAction<string>>): void {
        const newValue = value.replace(/\D/g, ''); // Удаляем все, кроме цифр
        setter(newValue);
    }

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
                            <label>Роль:</label>
                            <select title='Выберите роль' value={role} onChange={handleRoleChange}>
                                <option value="applicant">Терминал</option>
                                <option value="operator">Оператор</option>
                                <option value="registrar">Регистратор</option>
                                <option value="administrator">Администратор</option>
                                <option value="display">Дисплей</option>
                            </select>
                        </div>
                    </Flex>

                    {role === 'operator' && (
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
                                options={cities}
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
        </Container>
    )
}

export default Admin