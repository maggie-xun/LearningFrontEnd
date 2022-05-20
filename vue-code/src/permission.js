import router from './router'
import store from './store'

const whiteList=['/login']

router.beforeEach(async (to,from,next)=>{
    const hasToken=localStorage.getItem('token')

    if(hasToken){
        if(to.path==='/login') next({path:'/'})
        else{
            if(store.getters.hasRoles){next()}
            else{
                try{
                    const {roles}=await store.dispatch('user/getInfo')
                                      
                    const routes=await store.dispatch('permission/generateRoutes',roles)
                    // console.log(routes)
                    routes.forEach((route)=>{
                        router.addRoute(route)
                    })                  
                    next({...to,replace:true})
                }
                catch(error){
                    console.log(error)
                    // 出错重置令牌
                    await store.dispatch('user/resetToken')
                    next(`/login?redirect=${to.path}`)
                    alert(error || '未知错误')
                }
            }
        }
    }else{
        if(whiteList.indexOf(to.path)!==-1){
            next()
        }else{
            next({path:`/login?redirect=${to.path}`})
        }
    }
})