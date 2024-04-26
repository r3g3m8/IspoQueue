import React, { useState } from 'react';
import Button from '../Button/index.tsx';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Checkbox, Form, FormProps, Input } from 'antd'
import styles from "./login.module.css";

const Login = () => {
    const [login, setlogin] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Здесь можно добавить логику для отправки данных на сервер для аутентификации
        console.log('Логин:', login);
        console.log('Пароль:', password);
        // После отправки данных на сервер можно добавить обработку ответа и перенаправление пользователя на другую страницу
    };

    type FieldType = {
        login?: string;
        password?: string;
        remember?: string;
    };

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div>
            <Form
                name="normal_login"
                className={styles.loginForm}
                labelCol={{ span: 4 }}
                layout="vertical"    
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <h2>Вход</h2>
                
                <Form.Item<FieldType>
                    label="Логин"
                    name="login"
                    rules={[{ required: true, message: 'Введите логин!' }]}
                >
                    <Input
                        
                        prefix={<UserOutlined className="site-form-item-icon" />} 
                        placeholder="Логин"
                        value={login}
                        onChange={(e) => setlogin(e.target.value)} />
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
                        onChange={(e) => setPassword(e.target.value)} />
                </Form.Item>

                <Form.Item>
                    <Button>Войти</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;
