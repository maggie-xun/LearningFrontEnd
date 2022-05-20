const state={
    visitedViews:[]
}

const mutations={
    ADD_VISITED_VIEW:(state,view)=>{
        if (state.visitedViews.some(v => v.path === view.path)) return
        state.visitedViews.push(view)
    },
    DEL_VISITED_VIEW:(state,view)=>{
        state.visitedViews.forEach((element,index) => {
            if(element===view) state.visitedViews.splice(index,1)
        });
    }
}

const actions={
    add_visited_view({commit},view){
        commit('ADD_VISITED_VIEW',view)
    },
    del_visited_view({commit},view){
        commit('DEL_VISITED_VIEW',view)
    }
}
export default{
    namespaced:true,
    state,
    mutations,
    actions
}