import axios from "axios";
/*********************************
**  author: 陈洪泽
**  desc: 请求接口
*********************************/

const server = axios.create({
    baseURL : 'http://127.0.0.1:8080/api/',
    timeout : 1000 
});

//请求的拦截器
server.interceptors.request.use(
    function (config) {
        return config;
    }
);

// 响应的拦截器
server.interceptors.response.use(function (response) {
    return response.data;
});

export default server;