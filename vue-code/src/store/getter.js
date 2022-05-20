const getters={
    sidebar:state=>state.app.sidebar,
        permission_routes: state => state.permission.routes, // 完整路由
        roles: state => state.user.roles,
        hasRoles: state => state.user.roles && state.user.roles.length > 0
}
export default getters