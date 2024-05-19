import axios from 'axios';
 
export default function fetchQueue() {
    const getQueue = async  () => {
        let res;
        try {
            res = await axios.get('/api/queue');
            return res.data;
        } catch (e) {
            console.error(e);
            res = e;
            return res
        }
    }

    const addTicket = async (serviceId: number) => {
        try {
            const response = await axios.post('/api/Queue', { serviceId });
            console.log(response.data);
            // Добавьте здесь логику обработки успешного создания заявки
        } catch (error) {
            console.error('Error creating ticket:', error);
            // Добавьте здесь логику обработки ошибки
        }
    };
    
    return {
        getQueue,
        addTicket
    }
}