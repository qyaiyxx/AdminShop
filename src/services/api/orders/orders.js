import http from '../../request'

const getorders = () => {
    return http.post("/order/adminallorder")
}
const getordersdefila = (val) => {
    return http.post("/order/adminallorderdetail",val)
}
export default{
    getorders,getordersdefila
}