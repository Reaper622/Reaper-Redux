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
    function dispatch(action) {
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
        dispatch: dispatch,
        getState: getState
    };
};
exports.createStore = createStore;
// 根据两个State分类分离两个reducer的操作
// Counter 的 Reducer 接受和返回的都是 CounterState
function CounterReducer(state, action) {
    switch (action.type) {
        case 'INCREMENT': return __assign(__assign({}, state), { count: state.count + 1 });
        case 'DECREMENT': return __assign(__assign({}, state), { count: state.count - 1 });
        default: return state;
    }
}
exports.CounterReducer = CounterReducer;
// Info 的 Reducer 接受和返回的都是 InfoState
function InfoReducer(state, action) {
    switch (action.type) {
        case 'SET_NAME': return __assign(__assign({}, state), action.payload);
        case 'SET_DESCRIPTION': return __assign(__assign({}, state), action.payload);
        default: return state;
    }
}
exports.InfoReducer = InfoReducer;
/**
 * 实现reducer的组合函数 combineReducers 函数
 *
 * 传入的形式大概为
 * {
 *  counter: CounterReducer,
 *  info: InfoReducer
 * }
 */
function combineReducers(reducers) {
    var reducerKeys = Object.keys(reducers);
    // 返回一个新的 reducer函数
    return function (state, action) {
        // 生成新的state
        var nextState = {};
        // 遍历执行所有的reducer 之后合并生成的结果
        for (var _i = 0, reducerKeys_1 = reducerKeys; _i < reducerKeys_1.length; _i++) {
            var key = reducerKeys_1[_i];
            var reducer = reducers[key];
            // 之前对应key的上一个状态state
            var prevState = state[key];
            // 执行reducer 获取新的对应key的state
            var nextStateForKey = reducer(prevState, action);
            // 添加在新的state上
            nextState[key] = nextStateForKey;
        }
        // 返回新的state
        return nextState;
    };
}
exports.combineReducers = combineReducers;
