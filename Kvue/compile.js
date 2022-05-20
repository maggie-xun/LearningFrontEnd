class Compile {
    constructor(el, vm) {
        this.$el = document.querySelector(el);
        this.$vm = vm;

        var nodeFragment = this.getNodeFragment(this.$el);
        this.compile(nodeFragment);
        this.$el.appendChild(nodeFragment)
    }
    getNodeFragment(el) {
        let fragment = document.createDocumentFragment();
        let child;
        while (child = el.firstChild) {
            fragment.appendChild(child)
        }
        return fragment
    }
    compile(el) {
        const childNodes = el.childNodes;
        Array.from(childNodes).forEach((childNode) => {
            //元素节点
            if (childNode.nodeType == 1) {
                // console.log("元素节点" + childNode)
                this.compileElement(childNode);
            }
            else if (this.isInter(childNode)) {
                //插值表达式
                this.compileText(childNode);
            }
            //递归字节点
            if (childNode.childNodes && childNode.childNodes.length > 0) {
                this.compile(childNode)
            }
        })

    }
    isInter(childNode) {
        return childNode.nodeType == 3 && /\{\{(.*)\}\}/.test(childNode.textContent)
    }
    compileText(node) {
        const type = RegExp.$1
        this.update(node, type, 'text');
    }
    compileElement(node) {
        const attrs = node.attributes;
        Array.from(attrs).forEach((attr) => {
            const attrName = attr.name;
            const attrValue = attr.value
            //指令
            if (attrName.indexOf('k-') > -1) {
                const dir = attrName.substring(2);
                this.update(node, attrValue, dir)
            }
            //方法
            if (attrName.indexOf('@') > -1) {
                const eventName = attrName.substring(1);
                const event = this.$vm.$option.methods && this.$vm.$option.methods[eventName];
                node.addEventListener(eventName, event.bind(this.$vm))
            }
        })
    }
    update(node, type, dir) {
        const fun = this[dir + 'Updator'];
        const _vm = this;
        //第一次进来
        fun && fun.call(_vm, node, _vm.$vm[type], type)

        new Watcher(_vm.$vm, type, function (newValue) {
            fun && fun.call(_vm, node, newValue, type)
        })
    }
    textUpdator(node, value) {
        node.textContent = value
    }
    htmlUpdator(node, value) {
        node.innerHTML = value
    }
    modelUpdator(node, value, type) {
        node.value = value;
        const vm = this;
        node.addEventListener('input', function (event) {
            console.log(event.srcElement.value)
            console.log(type)
            vm.$vm[type] = event.srcElement.value
        })
    }
}