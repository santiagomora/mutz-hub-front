import axios from 'axios';

export const BASE_URL = 'http://localhost:8000';

const API_BASE = `${BASE_URL}/api`;

export const GET = (
    options
) => axios({
        method:'get',
        url:options.endpoint,
        timeout: 2000,
        baseURL: API_BASE,
        headers:{
            'Content-type':'application/json',
            'Accept':'application/json'
        },
    })

export const POST = (
    options
) => axios({
        method: 'post',
        url: options.endpoint,
        timeout: 1000,
        data:options.data,
        baseURL: API_BASE,
        headers:{
            'Content-type':'application/json',
            'Accept':'application/json'
        }
    });

export const DELETE = (
    options
) => axios({
        method: 'delete',
        url: options.endpoint,
        timeout: 1000,
        onDownloadProgress:options.download,
        onUploadProgress:options.upload,
        withCredentials:true,
        baseURL: API_BASE,
    });

export const PUT = (
    options
) => axios({
        method: 'put',
        url: options.endpoint,
        data:options.data,
        timeout: 1000,
        onDownloadProgress:options.download,
        onUploadProgress:options.upload,
        withCredentials:true,
        baseURL: API_BASE,
        headers:{
            'Content-type':'application/json'
        }
    });

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
