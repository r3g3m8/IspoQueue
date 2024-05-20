import axios from 'axios';
import {Guid} from "guid-typescript";
 
export default function fetchQueue() {
    const getQueue = async  () => {
        let res;
        try {
            res = await axios.get('/api/queue');
            return res.data;
        } catch (error) {
            console.error('Error creating ticket:', error);
            return error;
        }
    }

    const addTicket = async (serviceId: number) => {
        try {
            const response = await axios.post('/api/Queue', { serviceId });
            console.log(response.data);
        } catch (error) {
            console.error('Error creating ticket:', error);
        }
    };

    const deleteTicket = async (ticketId: Guid) => {
        try {
            const response = await axios.delete(`/api/queue/${ticketId}`);
            console.log(response.data);
        } catch (error) {
            console.error('Ошибка при удалении заявки:', error);
        }
    };

    const deferTicket = async (ticketId: Guid) => {
        try {
            const response = await axios.put(`/api/queue/defer/${ticketId}`);
            console.log(response.data);
        } catch (error) {
            console.error('Ошибка при отложении заявки:', error);
        }
    };
    
    return {
        getQueue,
        addTicket,
        deleteTicket,
        deferTicket
    }
}