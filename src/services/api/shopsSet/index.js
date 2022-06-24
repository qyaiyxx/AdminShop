import http from "../../request";

export default {
    setshopos(val){
        return http.post('/index/setshopos',val)
    },
}