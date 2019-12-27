"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var createStore = function (reducer, initState) {
    // 定义状态为初始状态
    var state = initState;
    // 定义订阅者
    var listeners = [];
    // 订阅
    function subscribe(listener) {
        listeners.push(listener);
    }
    // 改变状态
    function changeState(action) {
        // 按照reducer定义进行对state的更改
        state = reducer(state, action);
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
// 定义一个状态的变化函数，根据传入的状态以及定义的改变action 返回一个新的状态
function reducer(state, action) {
    switch (action.type) {
        case 'INCREMENT': return __assign(__assign({}, state), { count: state.count + 1 });
        case 'DECREMENT': return __assign(__assign({}, state), { count: state.count - 1 });
        default: return state;
    }
}
exports.reducer = reducer;
