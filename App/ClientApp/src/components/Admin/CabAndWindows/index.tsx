import React, { useState, useEffect } from 'react';
import {Card, Button, Modal, Form, Input, List, Space, message, Flex, Row, Col, Switch, ConfigProvider} from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios, {AxiosError} from 'axios';
import MyButton from '../../Button'
import styles from "../admin.module.css";
import Add from "../../../public/Add.svg";
interface Cabinet {
    id: string
    name: string
    windows: Window[] | undefined;
}

interface Window {
    id: string;
    name: string;
    isActive: boolean;
}

const CabinetsAndWindows = () => {
    const [cabinets, setCabinets] = useState<Cabinet[]>([]);
    const [selectedCabinet, setSelectedCabinet] = useState<Cabinet | null>(null);
    const [selectedWindow, setSelectedWindow] = useState<Window | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isWindow, setIsWindow] = useState(false);
    const [form] = Form.useForm();
    
    useEffect(() => {
        fetchCabinets();
    }, [])

    const fetchCabinets = async () => {
        try {
            const response = await axios.get('/api/Cabinet');
            setCabinets(response.data);
        } catch (error) {
            console.error('Ошибка при получении пользователей:', error);
        }
    };

    const handleAddCabinet = () => {
        setIsWindow(false);
        setIsEditing(false);
        setSelectedCabinet(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleEditCabinet = (cabinet) => {
        setIsWindow(false);
        setIsEditing(true);
        setSelectedWindow(null);
        setSelectedCabinet(cabinet);
        form.setFieldsValue(cabinet);
        setIsModalVisible(true);
    };

    const handleDeleteCabinet = async (cabinetId) => {
        try {
            await axios.delete(`/api/cabinet/${cabinetId}`);
            message.success('Кабинет удален успешно');
            await fetchCabinets();
            window.location.href = "/";
        } catch (err) {
            const error = err as AxiosError<{ message?: string; status?: string }>;
            if (error.response && error.response.data) {
                message.error(`Ошибка при удалении кабинета: ${error.response.data?.message}`);
            } else {
                message.error('Возникла непредвиденная ошибка при удалении кабинета. Попробуйте снова!');
            }
        }
    };

    const handleAddWindow = (cabinet) => {
        setSelectedWindow(null);
        setSelectedCabinet(cabinet);
        form.resetFields();
        setIsModalVisible(true);
        setIsWindow(true);
    };

    const handleEditWindow = (window) => {
        setIsEditing(true);
        setSelectedCabinet(null);
        setSelectedWindow(window);
        form.setFieldsValue(window);
        setIsModalVisible(true);
        setIsWindow(true);
    };

    const handleDeleteWindow = async (windowId) => {
        try {
            await axios.delete(`/api/window/${windowId}`);
            message.success('Окно удалено успешно');
            await fetchCabinets();
            window.location.reload();
        } catch (err) {
            const error = err as AxiosError<{ message?: string; status?: string }>;
            if (error.response && error.response.data) {
                message.error(`Ошибка при удалении окна: ${error.response.data?.message}`);
            } else {
                message.error('Возникла непредвиденная ошибка при удалении окна');
            }
        }
    };

    const handleOk = async () => {
        try {
            const values = form.getFieldsValue();
            if(!values.name){
                message.error(`Не введен номер окна`);
                return;
            }
            if (isEditing) {
                console.log(values);
                console.log(selectedWindow);
                console.log(selectedCabinet);
                if (selectedCabinet) {
                    await axios.put(`/api/cabinet/${selectedCabinet.id}`, values);
                    message.success('Кабинет обновлен успешно');
                } if(selectedWindow) {
                    await axios.put(`/api/Window/${selectedWindow.id}`, values);
                    message.success('Окно обновлено успешно');
                }
            } else {
                if (selectedCabinet) {
                    await axios.post(`/api/window/${selectedCabinet.id}`, values);
                    message.success('Окно добавлено успешно');
                } else {
                    await axios.post('/api/cabinet', values);
                    message.success('Кабинет добавлен успешно');
                }
            }
            await fetchCabinets();
            setIsModalVisible(false);
            //window.location.reload();
        } catch (err) {
            const error = err as AxiosError<{ message?: string; status?: string }>;
            if (error.response && error.response.data) {
                message.error(`Произошла ошбика при добавлении или изменении кабинетов и окон: ${error.response.data?.message}`);
            } else {
                message.error('Возникла непредвиденная ошибка при удалении окна. Попробуйте снова!');
            }
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedWindow(null);
        setSelectedWindow(null);
    };

    return (
        <div>
            <ConfigProvider
                theme={{
                    token: {
                        // Seed Token
                        colorPrimaryHover: '29757F',
                        colorPrimary: '#00b96b',
                        borderRadius: 2,
                    },
                }}
            >
            <h1>Управление кабинетами и окнами</h1>
            <MyButton outline onClick={handleAddCabinet}>
                <Flex justify={"center"} align={"center"}>
                    <p className={styles.textAdd}>Добавить кабинет</p>
                    <img className={styles.image} src={Add} width={35} alt={'add'}></img>
                </Flex>
            </MyButton>
                <ConfigProvider
                    theme={{
                        token: {
                            // Seed Token
                            colorBorder: '#29757F',
                            colorPrimary: '#29757F',
                            borderRadius: 2,
                        },
                    }}
                >
                    <Row gutter={[16, 16]}>
                        {cabinets.map((cabinet) => (
                            <Col key={cabinet.id} span={6}>
                                <Card
                                    title={cabinet.name}
                                    style={ { border: '1px solid #319F42'}  }
                                    styles={ {body: {padding: '0.5rem 24px'}}}
                                    extra={
                                        <Space>
                                            <Button icon={<EditOutlined style={{ color: '#29757F' }}/>} onClick={() => handleEditCabinet(cabinet)} />
                                            <Button icon={<DeleteOutlined />} danger onClick={() => handleDeleteCabinet(cabinet.id)} />
                                        </Space>
                                    }
                                >
                                    <List
                                        dataSource={cabinet.windows}
                                        renderItem={(window) => (
                                            <List.Item
                                                actions={[
                                                    <Button icon={<EditOutlined style={{ color: '#29757F' }}/>} onClick={() => handleEditWindow(window)} />,
                                                    <Button icon={<DeleteOutlined />} danger onClick={() => handleDeleteWindow(window.id)} />
                                                ]}
                                            >
                                                {window.name}
                                            </List.Item>
                                        )}
                                    />
                                    <MyButton dashed onClick={() => handleAddWindow(cabinet)}>
                                        <Flex justify={"center"} align={"center"}>
                                            <p className={styles.textAdd}>Добавить окно</p>
                                            <img className={styles.image} src={Add} width={30} alt={'add'}></img>
                                        </Flex>
                                    </MyButton>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </ConfigProvider>
           
            
                <Modal
                    title={isEditing ? 'Редактировать' : 'Добавить'}
                    open={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <Form form={form} layout="vertical">
                        <Form.Item
                            name="name"
                            label="Название"
                            rules={[{ required: true, message: 'Пожалуйста, введите название' }]}
                        >
                            <Input />
                        </Form.Item>
                        {isWindow && <Form.Item
                            name="isActive"
                            label="Активность"
                            valuePropName="checked"
                        >
                            <Switch />
                        </Form.Item>}

                    </Form>
                </Modal>
            </ConfigProvider>
            
        </div>
    );
};

export default CabinetsAndWindows;
