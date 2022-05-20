import axios from 'axios'
import { Message } from 'element-ui'
const service=axios.create({
    baseURL:process.env.VUE_APP_BASE_API,
    timeout:5000
})

service.interceptors.request.use(config=>{
return config
})

service.interceptors.response.use(
    response=>{
        const res=response.data;
        if(res.code!=20000){
            Message({
                message: res.message || 'Error',
                type: 'error',
                duration: 5 * 1000
            })
        }
        else{
            return res
        }
},
error=>{
    Message({
        message:error.message,
        type:error,
        duration:5*1000
    })
    return Promise.reject(error)
}
)
export default service