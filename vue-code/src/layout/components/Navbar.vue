<template>
    <div class="navbar">
        <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

        <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import {mapGetters} from 'vuex'
    export default {
        components: {
            Hamburger,Breadcrumb
        },
        computed: {
            ...mapGetters(['sidebar']) 
        },
        methods: {
            toggleSideBar() {
                this.$store.dispatch('app/toggleSideBar')
            }
        },
    }
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
    .hamburger-container{
        float: left;
        line-height: 46px;
        cursor: pointer;
        transition: background .3s;
        -webkit-tap-highlight-color:transparent;
        &:hover{
            background: rgba(0, 0, 0, .025)
        }
    }

     .breadcrumb-container {
    float: left;
  }
}
</style>