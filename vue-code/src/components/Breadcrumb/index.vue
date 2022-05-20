<template>
    <el-breadcrumb class="app-breadcrumb" separator="/">
        <el-breadcrumb-item v-for="item in levelList" :key=item.path>
            <span v-if="item.redirect==='noRedirect'||index==levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>
            <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a></el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
    export default {
        props: {
           
        },
        data() {
            return {
                 levelList: null,
            }
        },
        watch:{
            $route(route){
                if(route.path.startsWith('/redirect')) return
                this.getBreadcrumb()
            }
        },
        methods: {
            getBreadcrumb(){
                let matched=this.$route.matched.filter(item=>item.meta&&item.meta.title)
                const first=matched[0]
                if(!this.isDashboard(first)){
                    matched = [{ path: '/dashboard', meta: { title: 'Dashboard' }}].concat(matched)
                }
                this.levelList=matched.filter(item=>item.meta&&item.meta.title&&item.meta.breadcrumb!=false)
            },
            handleLink() {
                
            },
            isDashboard(route){
                const name=route&&route.name
                if(!name) return
                return name.trim().toLocaleLowerCase()==="dashboard"
            }
        },
    }
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb{
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 8px;
}
</style>