import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Input, message } from 'antd';
import axios from 'axios';
import styles from "./login.module.css";
import Button from '../Button';

const Login = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    type FieldType = {
        login?: string;
        password?: string;
    };

    const onFinish = async (values: FieldType) => {
        try {
            console.log(values)
            const response = await axios.post('/api/Authentication/login', {
                login: values.login,
                password: values.password,
            });
            const { token } = response.data;
            localStorage.setItem('token', token);
            message.success('Успешный вход');
            window.location.href = '/';
            // Redirect or update the state to indicate successful login
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                message.error(error.response.data?.message || 'Ошибка авторизации');
            } else {
                message.error('Ошибка соединения с сервером');
            }
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div>
            <Form
                name="normal_login"
                className={styles.loginForm}
                labelCol={{ span: 4 }}
                layout="vertical"
                style={{ fontSize: '22px' }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <h1>Вход</h1>

                <Form.Item<FieldType>
                    label="Логин"
                    name="login"
                    className={styles.inputLabel}
                    rules={[{ required: true, message: 'Введите логин!' }]}
                >
                    <Input
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="Логин"
                        style={{ fontSize: '16px' }}
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                    />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Пароль"
                    name="password"
                    rules={[{ required: true, message: 'Введите пароль!' }]}
                >
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        value={password}
                        placeholder="Пароль"
                        style={{ fontSize: '16px' }}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Item>

                <Form.Item>
                    <Button submit>Войти</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;
