"use strict";
exports.__esModule = true;
var createStore = function (initState) {
    // 定义状态为初始状态
    var state = initState;
    // 定义订阅者
    var listeners = [];
    // 订阅
    function subscribe(listener) {
        listeners.push(listener);
    }
    // 改变状态
    function changeState(newState) {
        state = newState;
        for (var _i = 0, listeners_1 = listeners; _i < listeners_1.length; _i++) {
            var listener = listeners_1[_i];
            listener();
        }
    }
    // 返回状态 使用了闭包
    function getState() {
        return state;
    }
    return {
        subscribe: subscribe,
        changeState: changeState,
        getState: getState
    };
};
exports.createStore = createStore;
