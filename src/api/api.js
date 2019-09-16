import axios from 'axios'


 export let IPTest = 'http://127.0.0.1:8080'
 export let IP = 'http://192.168.43.18:8080'

const xhr = axios.create({
    // baseURL: IPTest,
    baseURL:IP
})

// 登录接口
export const loginApi = (acc, pwd) => {
    return xhr.post('/users/login', { acc, pwd })
        .then(data => data.data)
}


// 注册接口
export const regApi = (acc, pwd, checkCode) => {
    return xhr.post('/users/registor', { acc, pwd, checkCode })
        .then(data => data.data)
}

// 获取验证码接口
export const checkCodeApi = () => {
    return xhr.get('/users/valitecode').then(data => data.data)
}

// 猜你喜欢数据接口
export const likeApi = () => {
    return xhr.get('/gethouselist/like').then(data => data.data)
}