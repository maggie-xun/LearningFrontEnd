import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getter'

import user from './modules/user'
import permission from './modules/permission'
import app from './modules/app'
import settings from './modules/settings'
import tagsView from './modules/tagsView'

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{user,permission,app,settings,tagsView},
    getters: getters,
})