import axios from 'axios';
 
const fetchQueue = async  () => {
    try {
        let response = await axios.get('Queue');
        console.log("Data = " + JSON.stringify(response));
    } catch (e) {
        console.error(e.response);
    }
}
 
export default fetchQueue;