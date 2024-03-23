import axios from 'axios';

export const axiosApi = axios.create({
    baseURL: 'https://silalievabegimay-ba6af-default-rtdb.europe-west1.firebasedatabase.app',
});

export default axiosApi;