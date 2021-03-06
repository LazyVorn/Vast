//目前用的iview,如果换了,记得把message换掉
import Axios from 'axios'
import qs from 'qs'
import {
    Message
} from 'element-ui'

/**
 * 设置公共请求头access_token
 */
// Axios.defaults.headers.common['CLIENTVERSION'] = `V1`;
/**
 * get
 * @param  {String} url    [地址]
 * @param  {Object} params [参数]
 * @return {Object}        [Promise]
 */
export const $get = (url, params) => {
        return new Promise((resolve, reject) => {
            Axios.get(url, {
                params: {
                    ...params,
                    // _t: new Date().getTime()
                }
            }).then((res) => {
                if (res.status == 200) {
                    resolve(res.data)
                } else {
                    failMessage(res.message)
                    reject(res)
                }
            }).catch((mes) => {
                failMessage(mes.message)
                reject(mes)
            })
        })
    }
    /**
     * get
     * @param  {String} url    [地址]
     * @param  {Object} params [参数]
     * @return {Object}        [Promise]
     */
export const $put = (url, params) => {
        return new Promise((resolve, reject) => {
            Axios.put(url, {
                ...params
            }).then((res) => {
                if (res.status == 200) {
                    resolve(res.data)
                } else {
                    failMessage(res.message)
                    reject(res)
                }
            }).catch((mes) => {
                failMessage(mes.message)
                reject(mes)
            })
        })
    }
    /**
     * get
     * @param  {String} url    [地址]
     * @param  {Object} params [参数]
     * @return {Object}        [Promise]
     */
export const $del = (url, params) => {
        return new Promise((resolve, reject) => {
            Axios.delete(url, {
                params: {
                    ...params,
                    // _t: new Date().getTime()
                }
            }).then((res) => {
                if (res.status == 200) {
                    resolve(res.data)
                } else {
                    failMessage(res.message)
                    reject(res)
                }
            }).catch((mes) => {
                failMessage(mes.message)
                reject(mes)
            })
        })
    }
    /**
     * post
     * @param  {String} url    [地址]
     * @param  {Object} params [参数]
     * @param  {String} type   [可不传，设定为form为formdata提交]
     * @return {Object}        [Promise]
     */
export const $post = (url, params, type) => {
        if (type == 'form') {
            return new Promise((resolve, reject) => {
                Axios.post(url, qs.stringify(params)).then((res) => {
                    if (res.status == 200) {
                        resolve(res.data)
                    } else {
                        failMessage(res.message)
                        reject(res)
                    }
                }).catch((mes) => {
                    failMessage(mes.message)
                    reject(mes)
                })
            })
        } else {
            return new Promise((resolve, reject) => {
                let type = Object.prototype.toString.call(params);
                if (type == '[object Array]') {
                    Axios.post(url, params).then((res) => {
                        if (res.status < 500) {
                            resolve(res.data)
                        } else {
                            failMessage(res.message)
                            reject(res)
                        }
                    }).catch((mes) => {
                        failMessage(mes.message)
                        reject(mes)
                    })
                } else {
                    Axios.post(url, {
                        ...params
                    }).then((res) => {
                        if (res.status < 500) {
                            resolve(res.data)
                        } else {
                            failMessage(res.message)
                            reject(res)
                        }
                    }).catch((mes) => {
                        if (mes.response.status < 500) {
                            resolve(mes.response)
                        } else {
                            failMessage(mes.response.data.message)
                            reject(mes)
                        }
                    })
                }
            })
        }
    }
    /**
     * Axios 配置 向服务端发送请求
     * @param {Object} param url配置信息对象
     * @param {Object} param.query  url中直接拼接的查询参数 // `params` 是即将与请求一起发送的 URL 参数// 必须是一个无格式对象(plain object)或 URLSearchParams 对象
     * @param {String} param.method 请求类别
     * @param {Object} param.data 主体数据对象
     * @param {String} [method='GET'] method  http请求类型
     * @returns {Promise}
     */
export const $Axios = (url, param) => {
    return new Promise((resolve, reject) => {
        Axios(url, param).then((res) => {
            if (res.status == 200) {
                resolve(res.data)
            } else {
                failMessage()
                reject(res)
            }
        }).catch((mes) => {
            failMessage()
            reject(mes)
        })
    })
}
export const $AxiosOld = (url, param) => {
    return new Promise((resolve, reject) => {
        Axios(url, param).then((res) => {
            if (res.status == 200) {
                resolve(res.data)
            } else {
                failMessage()
                reject(res)
            }
        }).catch((mes) => {
            failMessage()
            reject(mes)
        })
    })
}

function failMessage(mes = '数据获取失败') {
    Message.warning(mes)
}