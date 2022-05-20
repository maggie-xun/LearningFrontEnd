
import loadingVue from './loading.vue'
let loading = {}

loading.install = (Vue) => {
    const loadingConstructor = Vue.extend(loadingVue);
    const instance = new loadingConstructor();
    instance.$mount(document.createElement('div'))
    document.body.append(instance.$el);

    Vue.prototype.$loading = () => {
        instance.show = true;
        setTimeout(() => {
            instance.show = false;
        }, 5000)
    }

}

export default loading;