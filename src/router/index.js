/*
 * @Author: qqq
 * @Date: 2021-09-20 01:48:26
 * @LastEditors: qqqq
 * @LastEditTime: 2021-10-17 15:26:33
 * @Description: file content
 */
import {
    createRouter,
    createWebHistory
} from 'vue-router'
import login from '../view/Login.vue'
const routes = [{
        path: '/',
        name: "login",
        component: login
    },
    {
        path: '/home',
        name: "home",
        component: () => import('../view/Home.vue'),
        redirect: '/water',
        children: [{//流水
                path: '/water',
                name: "orderwater",
                component: () => import('../view/OrderWater.vue')
            },
            {//订单
                path: '/order',
                name: "order",
                component: () => import('../view/Order.vue')
            },
            {
                path: '/shopcart',
                name: "shopcart",
                component: () => import('../view/ShopCart.vue')
            },
            {
                path: '/shop',
                name: "shopset",
                component: () => import('../view/product/ShopSet.vue')
            },
            {//用户
                path: '/user',
                name: "user",
                component: () => import('../view/User.vue')
            },
            {//店铺
                path: '/goodset',
                name: "goodset",
                component: () => import('../view/GoodSet.vue')
            },
            {//
                path: '/setshop',
                name: "setshop",
                component: () => import('@c/setshop/ListShop.vue')
            },
            {//添加商品分类
                path: '/addshopclass',
                name: "addshopclass",
                component: () => import('../view/product/addclass.vue')
            },
            {
                path: '/add',
                name: "addproduct",
                component: () => import('../view/product/AddProduct.vue')
            },
            {
                path: '/updataproduct/:id',
                name: "updataproduct",
                component: () => import('@c/setshop/UpdateProduct.vue')
            }
        ]
    },
]

const route = createRouter({
    history: createWebHistory(),
    routes
})
export default route