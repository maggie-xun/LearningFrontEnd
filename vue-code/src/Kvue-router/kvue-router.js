let Vue = null;

class VueRouter {
    constructor(options) {
        this.mode = options.mode || 'hash'
        this.$options = options;
        this.routerMap = {}
        this.$options.routes.forEach(element => {
            this.routerMap[element.path] = element
        });

        Vue.util.defineReactive(this, 'current', location.hash.slice(1))
        Vue.util.defineReactive(this, 'matched', []);
        this.init();
        this.match();


    }
    match(routes) {
        let routesArr = routes || this.$options.routes
        for (let index = 0; index < routesArr.length; index++) {
            const element = routesArr[index];
            if (element.path === '/' && this.current === '/') {
                this.matched.push(element)
                return
            }
            if (element.path != '/' && this.current.indexOf(element.path) > -1) {
                this.matched.push(element)
                if (element.children) {
                    this.match(element.children)
                }
                return
            }

        }


    }
    init() {
        if (this.mode === 'hash') {
            location.hash ? '' : location.hash = '/';
            window.addEventListener("load", (() => {
                this.current = location.hash.slice(1);
                this.matched = [];
                this.match();
            }).bind(this))
            window.addEventListener('hashchange', (() => {
                this.current = location.hash.slice(1);
                this.matched = [];
                this.match();
            }).bind(this))
        } else {
            location.pathname ? '' : location.pathname = '/';
            window.addEventListener('load', (() => {
                this.current = location.pathname;
                this.matched = [];
                this.match();
            }).bind(this))
            window.addEventListener("popstate", (() => {
                this.current = location.pathname;
                this.matched = [];
                this.match();
            }).bind(this))
        }


    }
    onHashChange() {
        this.current = window.location.hash.slice(1)
    }
}

VueRouter.install = function (_vue) {
    Vue = _vue;
    Vue.mixin({
        beforeCreate() {
            // 只有根实例才有router选项
            if (this.$options && this.$options.router) { // 如果是根组件
                Vue.prototype.$router = this.$options.router
            }
            // Object.defineProperty(this, '$router', {
            //     get() {
            //         return this._root._router
            //     }
            // });
            // //新增代码
            // Object.defineProperty(this, '$route', {
            //     get() {
            //         return this._root._router.history.current
            //     }
            // })
        },
    })

    Vue.component('router-link', {
        props: {
            to: {
                type: String,
                required: true
            }
        },
        // render(h) {
        //     return h('a', { attrs: { href: '#' + this.to } }, this.$slots.default)
        // },
        render(h) {
            let mode = this.$router.mode;
            let to = mode === "hash" ? "#" + this.to : this.to
            return h('a', { attrs: { href: to } }, this.$slots.default)
        }


    })

    Vue.component('router-view', {
        render(h) {
            this.$vnode.data.routerView = true;
            let depth = 0;
            let parent = this.$parent
            while (parent) {
                const vnodeData = parent.$vnode && parent.$vnode.data
                if (vnodeData && vnodeData.routerView) {
                    depth++;
                }
                parent = parent.$parent;
            }
            let component = null;
            let route = this.$router.matched[depth]
            if (route) {
                component = route.component
            }

            return h(component)
            // let current = this._self._root._router.history.current
            // let routerMap = this._self._root._router.routerMap;
            // return h(routerMap[current])
        },
    })
}
export default VueRouter