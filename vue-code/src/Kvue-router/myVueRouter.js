let vue = null;
class HistoryRoute {
  constructor() {
    this.current = null;
  }
}
class VueRouter {
  constructor(options) {
    this.mode = options.mode || "hash";
    this.routes = options.routes || [];
    this.routerMap = this.createMap(this.routes);
    this.history = new HistoryRoute();
    this.init();
  }

  init() {
    if (this.mode === "hash") {
      location.hash ? "" : (location.hash = "/");
      window.addEventListener("hashchange", () => {
        this.history.current = location.hash.slice(1);
      });
      window.addEventListener("DOMContentLoaded", () => {
        this.history.current = location.hash.slice(1);
      });
    } else if (this.mode === "history") {
      location.pathname ? "" : (location.pathname = "/");
      window.addEventListener("popstate", () => {
        this.history.current = location.pathname;
      });

      window.addEventListener("DOMContentLoaded", () => {
        var linkList = document.querySelectorAll("a[href]");
        linkList.forEach(item => {
          item.addEventListener("click", e => {
            e.preventDefault();
            history.pushState(null, "", item.getAttribute("href"));
            this.history.current = location.pathname;
          });
        });
      });
    }
  }
  createMap(params) {
    return params.reduce((pre, current) => {
      pre[current.path] = current.component;
      return pre;
    }, {});
  }
}
VueRouter.install = function(_vue) {
  vue = _vue;
  vue.mixin({
    beforeCreate() {
      //根组件
      if (this.$options && this.$options.router) {
        this._root = this;
        this._router = this.$options.router;
      } else {
        this._root = this.$parent && this.$parent._root;
      }
      vue.util.defineReactive(this, "xxx", this._root._router.history);

      Object.defineProperty(this, "$router", {
        get() {
          return this._root._router;
        }
      });

      Object.defineProperty(this, "$route", {
        get() {
          return this._root._router.history.current;
        }
      });
    }
  });
  vue.component("router-link", {
    props: {
      to: String
    },
    render(h) {
      // return h('a', {}, '首页')
      let mode = this._self._root._router.mode;
      let to = mode === "hash" ? "#" + this.to : this.to;
      return h("a", { attrs: { href: to } }, this.$slots.default);
    }
  });

  vue.component("router-view", {
    render(h) {
      // return h('span', {}, '首页视图')
      let current = this._root._router.history.current;
      let routes = this._root._router.routerMap;
      return h(routes[current]);
    }
  });
};

export default VueRouter;
