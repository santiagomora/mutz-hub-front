import axios from 'axios';

// export const BASE_URL = 'https://mutz-hub-back.herokuapp.com';
//
// export const RESOURCE_URL = 'https://mutz-hub.herokuapp.com';

console.log( process.env.NODE_ENV )

export const BASE_URL = process.env.NODE_ENV === 'production'
    ? 'https://mutz-hub-back.herokuapp.com'
    : 'http://127.0.0.1:8000';

export const RESOURCE_URL = process.env.NODE_ENV === 'production'
    ? 'https://mutz-hub.herokuapp.com'
    : 'http://127.0.0.1:3000';

console.log(BASE_URL,RESOURCE_URL)

const API_BASE = `${BASE_URL}/api`;

export const GET = (
    options
) => {
    return axios({
        method:'get',
        timeout: 10000,
        baseURL: API_BASE,
        crossDomain:true,
        withCredentials:true,
        headers:{
            'Content-type':'application/json',
            'Accept':'application/json'
        },
        ...options
    });
}

export const POST = (
    options
) => {
    return axios({
        method: 'post',
        timeout: 8000,
        baseURL: API_BASE,
        crossDomain:true,
        withCredentials:true,
        headers:{
            'Content-type':'application/json',
            'Accept':'application/json'
        },
        ...options
    });
}

export const DELETE = (
    options
) => axios({
        method: 'delete',
        url: options.endpoint,
        timeout: 1000,
        withCredentials:true,
        baseURL: API_BASE,
        headers:{
            'Content-type':'application/json',
            'Accept':'application/json'
        },
    });

export const PUT = (
    options
) => {

    return axios({
        method: 'put',
        timeout: 5000,
        baseURL: API_BASE,
        crossDomain:true,
        withCredentials:true,
        headers:{
            'Content-type':'application/json',
            'Accept':'application/json'
        },
        ...options
    });
}

axios.interceptors.request.use(
    function (config) {
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    function (config) {
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);
