/*
 * @Author: qqq
 * @Date: 2021-09-22 14:45:51
 * @LastEditors: qqqq
 * @LastEditTime: 2021-09-22 15:25:48
 * @Description: file content
 */
export const setloca=(key,value)=>{
    window.localStorage.setItem(key,value)
}
export const getloca=(key)=>{
    window.localStorage.getItem(key)
}