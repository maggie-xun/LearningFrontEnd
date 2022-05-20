// import variables from '@/styles/element-variables.scss'
import defaultSettings from '@/settings'
const {fixedHeader,tagsView}=defaultSettings

const state={
fixedHeader:fixedHeader,
tagsView:tagsView
}

const mutations={
    CHANGE_SETTING:(state,{key,value})=>{
        if(Object.prototype.hasOwnProperty.call(state,key))
            state[key]=value
    }
}

const actions={
    change_setting({commit},data){
        commit('CHANGE_SETTING',data)
    }
}
export default{
    namespaced: true,
    state,
    mutations,
    actions
}