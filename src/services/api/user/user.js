/*
 * @Author: qqq
 * @Date: 2021-09-22 13:36:38
 * @LastEditors: qqqq
 * @LastEditTime: 2021-10-20 04:34:08
 * @Description: file content
 */
import  http  from "../../request.js";
const userlogin=(val)=>{
    return http.post('/admin/users/login',val)
}
const getuserlist = (val) => {//所有用户
    return http.post("/admin/users/getuserlist",val)
}
const updateuser = (val) => {//设置分类
    return http.post("/users/updateuser",val)
}
const deleteuser = (val) => {//设置分类
    return http.post("/users/deleteuser",val)
}
const selectuser = (val) => {//设置分类
    return http.post("/users/selectuser",val)
}
export default{
    getuserlist,deleteuser,updateuser,selectuser,userlogin
}