/*
 * @Author: qqq
 * @Date: 2021-09-23 21:38:23
 * @LastEditors: qqqq
 * @LastEditTime: 2021-10-23 21:09:10
 * @Description: file content
 */
import http from "../../request.js";

export const setproductclass = (val) => {//设置分类

    return http.post("/product/addProductClass", val)
}
export const getproductclass = () => {//获取分类
    return http.get("/product/getProductClass")
}
export const delproductclass = (val) => {//删除分类
    return http.post("/product/delProductClass",val)
}
export const addproduct = (val) => {//添加商品
    return http.post("/product/addproduct",val)
}
export const getproduct = (val) => {//获取全部商品
    return http.post("/product/getAllProduct",val)
}
export const getproductsales = (val) => {//获取商品销售最高
    return http.post("/product/getproductsales",val)
}
export const getproductstate = (val) => {//根据商品状态获取商品
    return http.post("/product/getproductstate",val)
}
export const searchproductdata = (val) => {//搜索商品
    return http.post("/product/searchproduct",val)
}
export const deleteproduct = (val) => {//删除商品
    return http.post("/product/deleteproduct",val)
}
export const getproductone = (val) => {//获取商品
    return http.post("/product/getproduct",val)
}
export const updateproduct = (val) => {//修改商品
    return http.post("/product/updateproduct",val)
}