/*
 * @Author: qqq
 * @Date: 2021-09-20 01:56:14
 * @LastEditors: qqqq
 * @LastEditTime: 2021-10-08 11:22:48
 * @Description: file content
 */
import axios from 'axios'
import {getloca} from '../uitls/storageuitl.js'
const httsrequerst=axios.create({
    baseURL:'http://localhost:3000',
    timeout:10000
})
const token=getloca('token')||''
httsrequerst.defaults.headers['Authorization'] =token;
httsrequerst.defaults.headers['Content-Type']='application/json;charset=utf-8'
const get=(url)=>{
    return new Promise((res,rej)=>{
        httsrequerst({
            url,
            method:'get',
        }).then((data)=>{
            res(data.data)
        }).catch(e=>{
            rej(e)
        })
    })
}
const post=(url,params)=>{
    return new Promise((res,rej)=>{
        httsrequerst({
            url,
            method:'post',
            data:params
        }).then((data)=>{
            res(data.data)
        }).catch(e=>{
            rej(e)
        })
    })
}
const http={
    get,post
}
export default http