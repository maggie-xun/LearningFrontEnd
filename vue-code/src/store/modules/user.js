const state={
    token:localStorage.getItem('token'),
    roles:[]
}

const mutations={
    setToken(state,token){
        state.token=token
    },
    setRoles(state,roles){
        state.roles=roles
    }
}

const actions={
    login({commit},userInfo){
        const {username}=userInfo;
        return new Promise((resolve,reject)=>{
            setTimeout(() => {
                if(username==="admin"||username==="editor"){
                    commit("setToken",username)
                    localStorage.setItem('token',username);
                    resolve();
                }else{
                    reject("用户名、密码错误")
                }
            }, 1000);
        })
    },
    getInfo({commit,state}){
        return new Promise((resolve)=>{
            setTimeout(()=>{               
               const roles= state.token==="admin"?["admin"]:["editor"];
               commit('setRoles',roles)
               resolve({roles})
            })
        })
    },
      resetToken({commit}) {
        return new Promise(resolve => {
        commit('setToken', '')
        commit('setRoles', [])
        localStorage.removeItem('token')
        resolve();
    })
  }
}

export default{
    namespaced:true,
    state,
    mutations,
    actions
}