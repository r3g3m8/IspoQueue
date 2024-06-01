import axios from 'axios';
import {Guid} from "guid-typescript";
import {AxiosError} from "axios/index";
import {message} from "antd";
 
export default function fetchQueue() {
    const getQueue = async  () => {
        let res;
        try {
            res = await axios.get('/api/queue');
            return res.data;
        } catch (err) {
            const error = err as AxiosError<{ message?: string; status?: string }>;
            if (error.response && error.response.data) {
                message.error(`Ошибка при получении очереди: ${error.response.data?.message}`);
            } else {
                message.error('Возникла непредвиденная ошибка при получении очереди. Попробуйте снова!');
            }
        }
    }

    const getActiveQueue = async  () => {
        let res;
        try {
            res = await axios.get('/api/queue/active');
            return res.data;
        } catch (err) {
            const error = err as AxiosError<{ message?: string; status?: string }>;
            if (error.response && error.response.data) {
                message.error(`Ошибка при получении текущей заявки: ${error.response.data?.message}`);
            } else {
                message.error('Возникла непредвиденная ошибка при получении текущей заявки. Попробуйте снова!');
            }
        }
    }

    const addTicket = async (serviceId: number) => {
        try {
            const response = await axios.post('/api/Queue', { serviceId });
            return response.data;
        } catch (err) {
            const error = err as AxiosError<{ message?: string; status?: string }>;
            if (error.response && error.response.data) {
                message.error(`Ошибка при создании заявки: ${error.response.data?.message}`);
            } else {
                message.error('Возникла непредвиденная ошибка при создании заявки. Попробуйте снова!');
            }
        }
    };

    const deleteTicket = async (ticketId: Guid) => {
        try {
            const response = await axios.delete(`/api/queue/${ticketId}`);
        } catch (err) {
            const error = err as AxiosError<{ message?: string; status?: string }>;
            if (error.response && error.response.data) {
                message.error(`Ошибка при завершении заявки: ${error.response.data?.message}`);
            } else {
                message.error('Возникла непредвиденная ошибка при завершении заявки. Попробуйте снова!');
            }
        }
    };

    const deferTicket = async (id: Guid) => {
        try {
            const response = await axios.put(`/api/queue/defer/${id}`);
        } catch (err) {
            const error = err as AxiosError<{ message?: string; status?: string }>;
            if (error.response && error.response.data) {
                message.error(`Ошибка при попытке отложить заявку: ${error.response.data?.message}`);
            } else {
                message.error('Возникла непредвиденная ошибка при попытке отложить заявку. Попробуйте снова!');
            }
        }
    };
    
    return {
        getQueue,
        getActiveQueue,
        addTicket,
        deleteTicket,
        deferTicket
    }
}