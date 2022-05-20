let Vue = null;
class Store {
    constructor(options) {
        const store = this;
        this._getters = options.getters;
        const computed = {};
        store.getters = {}
        Object.keys(this._getters).forEach(key => {
            const fn = store._getters[key];
            computed[key] = function () {
                return fn(store.state)
            }
            Object.defineProperty(store.getters, key, {
                get: () => { return store._vm[key] }
            })
        })

        this._vm = new Vue({
            data: {
                $$state: options.state
            },
            computed
        })

        this._mutations = options.mutations;
        this._actions = options.actions;

        //绑定this 指向
        this.commit = this.commit.bind(this);
        this.dispatch = this.dispatch.bind(this)
    }
    get state() {
        return this._vm._data.$$state
    }
    commit(type, payload) {
        const fun = this._mutations[type];
        if (!fun) {
            console.log('mutation type error')
            return;
        }
        fun(this.state, payload)
    }
    dispatch(type, payload) {
        const fun = this._actions[type];
        if (!fun) {
            console.log('action type error')
            return;
        }
        fun(this.state, payload)
    }
}
function install(_Vue) {
    Vue = _Vue;
    Vue.mixin({
        beforeCreate() {
            if (this.$options.store) {
                Vue.prototype.$store = this.$options.store
            }
        },
    })


}
export default { install, Store }