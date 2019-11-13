import axios from 'axios';
import { Message } from 'element-ui';

axios.defaults.baseURL = process.env.VUE_APP_URL;

const httpres = axios.create({
  timeout: 5000,
  withCredentials: true,
});


function genOpts() {
    var opts = {
        method: 'get',
        url: '',
        data: null,
        params: null,
        timeout: 0,
    };
    return opts;
}
//线上
// 添加请求拦截器
httpres.interceptors.request.use(
    function(config) {
		// console.log(getCookie('user_id'))
        // let user_id = getCookie('user_id');
        // let token = getCookie('token');
        // if (token && config.method == 'post') {
        //     if (config.data instanceof FormData) {
        //         config.data.append('user_id', user_id);
        //         config.data.append('token', token);
        //     } else if (config.url.indexOf('verifypass') === -1) {
        //         let data = { ...config.data, token, user_id };
        //         config.data = data;
        //     }
        // }
        // if ((config.url.indexOf('set_') !== -1 ||config.url.indexOf('add_') !== -1||config.url.indexOf('del_') !== -1)&& getCookie('role') == '1') {
        //     Message.error('没有权限');
        //     return Promise.reject('没有权限');
        // }
        // 对请求配置做点什么
        // console.log(config.data)
        return config;
    },
    function(err) {
        return Promise.reject(err);
    }
);
//添加响应拦截器
httpres.interceptors.response.use(
    function(response) {
        // 对响应数据做点什么
        if (response.data.code && response.data.code !== 0) {
            Message.warning(response.data.msg || '出错了');
        }
        if (response.data.code && response.data.code == 4) {
            router.push('/');
            clearAllCookie();
        }
        return response.data;
    },
    function(err) {
        var errTxt = err + '';
        if (errTxt.indexOf('timeout') !== -1) {
            Message('网络连接超时~');
        } else if (String(err).indexOf('Network Error') != -1) {
            Message('网络连接失败~');
        } else {
            Message('服务器开小差了~');
        }
        return Promise.reject(err);
    }
);

export async function httpRes(options) {
    var opts = {
        ...genOpts(),
        ...options,
    };
    try {
        let data = await httpres(opts);
        if (data.status == 200) {
            return data;
        } else {
            throw new Error(data.msg);
        }
    } catch (error) {
        console.log(error);
        return error;
    }
}