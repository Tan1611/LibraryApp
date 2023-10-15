import axiosClient from './axios';

const userApi = {
    getall(params) {
        const url = '/users';
        return axiosClient.get(url, {params});  
    },
    get(id){
        const url = `/users/${id}`;
        return axiosClient.get(url); 
    }
}
export default userApi;