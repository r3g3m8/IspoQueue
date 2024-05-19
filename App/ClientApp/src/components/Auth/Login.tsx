import React, { useState } from 'react';
import Button from '../Button';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form, FormProps, Input } from 'antd'
import styles from "./login.module.css";

const Login = () => {
    const [login, setlogin] = useState('');
    const [password, setPassword] = useState('');

    type FieldType = {
        login?: string;
        password?: string;
    };

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Логин:', login);
        console.log('Пароль:', password);
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
                        style={{ fontSize: '16px' }}
                        onChange={(e) => setPassword(e.target.value)} />
                </Form.Item>

                <Form.Item>
                    <Button submit>Войти</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;
