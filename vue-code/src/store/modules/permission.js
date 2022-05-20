import {asyncRoutes, constRoutes} from '@/router'

const state = {
    routes: [], // 完整路由表
    addRoutes: [] // 用户动态添加的权限路由
}

const mutations = {
    SET_ROUTES: (state, routes) => {
        state.addRoutes = routes
        state.routes = constRoutes.concat(routes);
    }
}

const actions = {
    generateRoutes({commit}, roles) {
        return new Promise(resolve => {
            // 根据用户角色过滤出能够访问的动态路由
            const accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
            commit('SET_ROUTES', accessedRoutes);
            resolve(accessedRoutes)
        })
    }
}

// 递归过滤asyncRoutes
export function filterAsyncRoutes(routes, roles) {
    const res = [];

    routes.forEach(route => {
        // 复制一份路由
        const tmp = {...route};
        // 如果拥有访问权，则添加到res中
        // 判断当前用户角色数组中是否包含tmp中要求的角色
        if (hasPermission(roles, tmp)) {
            // 递归
            if (tmp.children) {
                tmp.children = filterAsyncRoutes(tmp.children, roles)
            }
            res.push(tmp);
        }
    })

    return res;
}

function hasPermission(roles, route) {
    if (route.meta && route.meta.roles) {
        // 在roles里面寻找复合role。meta.roles要求的，有一个即可
        return roles.some(role => route.meta.roles.includes(role))
    } else {
        // 没有设置roles，无需判定即可访问
        return true;
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}