import http from '../../request'

const getorders = () => {
    return http.post("/order/adminallorder")
}

export default{
    getorders
}