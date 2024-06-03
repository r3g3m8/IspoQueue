import React, { useState } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import './NavMenu.css';
import IspoLogo from '../public/IspoLogo.svg';
import Button from "./Button";
import moment from "moment";
import 'moment/locale/ru'
import {ConfigProvider, Flex, Form, Input, Modal} from "antd";
import axios, { AxiosError } from "axios";

type Props = {
    isAuthenticated: boolean,
    userRole: string | null,
    login: string;
    logout: () => void;
}

export default function NavMenu(props: Props) {
    const [collapsed, setCollapsed] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    const toggleNavbar = () => {
        setCollapsed(!collapsed);
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        const value = form.getFieldsValue();
        try {
            var res = await axios.get('api/Authentication/logout', {
                params: {
                    Login: props.login,
                    Password: value.password
                }
            });
            if (res.data.logout) {
                props.logout();
                setIsModalVisible(false);
            } else {
                alert("Неправильный пароль");
                setIsModalVisible(false);
            }
        } catch (err) {
            const error = err as AxiosError;
            console.log(error?.response?.data);
            alert("Неправильный пароль");
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <header>
            <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
                <NavbarBrand href="/">
                    <img src={IspoLogo} alt="ISPO Logo" className="logo" />
                </NavbarBrand>
                <NavbarToggler onClick={toggleNavbar} className="mr-2" />
                <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
                    <ul className="navbar-nav flex-grow">
                        <NavItem>
                            {!props.isAuthenticated ?
                                <NavLink tag={Link} className="text-dark" to="/login">
                                    Войти
                                </NavLink> : props.userRole !== 'Дисплей' && props.userRole !== 'Терминал' ?
                                    <Button destructive onClick={props.logout}>Выйти</Button> :
                                    <Flex align={"center"}>
                                        <Button onClick={showModal} ghost>Выход</Button>
                                        <div className="dateViewer">
                                            {moment().format("LLL")}
                                        </div>
                                    </Flex>
                                    
                            }
                        </NavItem>
                    </ul>
                </Collapse>
            </Navbar>

            <ConfigProvider
                theme={
                {
                    token: {
                        // Seed Token
                        colorErrorBgHover: 'red',
                        colorBorder: '#29757F',
                        colorPrimary: '#319F42',
                        borderRadius: 2,
                    },
                    
                }}
            >
            <Modal
                title="Введите пароль для выхода"
                open={isModalVisible}
                okText={"Выйти"}
                cancelText={"Отмена"}
                okType={"danger"}
                onOk={handleOk}
                onCancel={handleCancel}
                styles={{footer: {color: 'red'}}}
            >
                <Form form={form} layout="vertical" onFinish={handleOk}>
                    <Form.Item
                        name="password"
                        label="Пароль"
                        rules={[{ required: true, message: 'Пожалуйста, введите пароль' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                </Form>
            </Modal>
            </ConfigProvider>
        </header>
    );
}
