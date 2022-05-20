const { worker } = require("cluster");

function getScrollOffset() {
  if (window.pageXOffset) {
    return {
      top: window.pageXOffset,
      left: window.pageYOffset,
    };
  } else {
    return {
      top: document.body.scrollTop + document.documentElement.scrollTop,
      left: document.body.scrollLeft + document.documentElement.scrollLeft,
    };
  }
}

//获得视口的尺寸
function getViewportOffset() {
  if (window.innerWidth) {
    return {
      w: window.innerWidth,
      h: window.innerHeight,
    };
  } else {
    // ie8及其以下
    if (document.compatMode === "BackCompat") {
      // 怪异模式
      return {
        w: document.body.clientWidth,
        h: document.body.clientHeight,
      };
    } else {
      // 标准模式
      return {
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight,
      };
    }
  }
}

function getStyles(ele, prop) {
  if (window.getComputedStyle) {
    if (prop) {
      return window.getComputedStyle(ele, null)[prop];
    }
    return window.getComputedStyle(ele, null);
  } else {
    if (prop) {
      return ele.currentStyle[prop];
    } else {
      return ele.currentStyle;
    }
  }
}

function addEvent(el, type, fn) {
  if (el.addEventListener) {
    el.addEventListener(type, fn, false);
  } else if (el.attachEvent) {
    el.attachEvent("on" + type, fn);
  } else {
    el["on" + type] = fn;
  }
}

//解绑事件
function removeEvent(elem, type, handle) {
  if (elem.removeEventListener) {
    //非ie和非ie9
    elem.removeEventListener(type, handle, false);
  } else if (elem.detachEvent) {
    //ie6到ie8
    elem.detachEvent("on" + type, handle);
  } else {
    elem["on" + type] = null;
  }
}

//取消冒泡
function stopBubble(e) {
  if (e && e.stopPropagation) {
    e.stopPropagation();
  } else {
    window.event.cancelBubble = true;
  }
}

//兼容getElementsByClassName方法
Element.prototype.getElementsByClassName =
  Document.prototype.getElementsByClassName = function (_className) {
    var allDomArray = document.getElementsByTagName("*");
    var lastDomArray = [];
    function trimSpace(strClass) {
      var reg = /\s+/g;
      return strClass.replace(reg, " ").trim();
    }
    for (var i = 0; i < allDomArray.length; i++) {
      var classArray = trimSpace(allDomArray[i].className).split(" ");
      for (var j = 0; j < classArray.length; j++) {
        if (classArray[j] == _className) {
          lastDomArray.push(allDomArray[i]);
          break;
        }
      }
    }
    return lastDomArray
  };

//遍历dom树
// 给定页面上的DOM元素,将访问元素本身及其所有后代(不仅仅是它的直接子元素)
// 对于每个访问的元素，函数讲元素传递给提供的回调函数
function traverse(element, callback) {
  callback(element);
  var list = element.children;
  for (var i = 0; i < list.length; i++) {
    traverse(list[i], callback);
  }
}
