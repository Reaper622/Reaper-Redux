const {createStore, CounterReducer, InfoReducer, combineReducers} = require('./MultiplyMiddleware')
const {LoggerMiddleware} = require('./LoggerMiddleware')
const {ExceptionMiddleware} = require('./ExceptionMiddleware')
const {TimerMiddleware} = require('./TimerMiddleware')

// 定义新的 reducer
const reducer = combineReducers({
    counter: CounterReducer,
    info: InfoReducer
})

let initState = {
    counter: {
        count: 0
    },
    info: {
        name: 'reaper',
        description: 'a Front End programmer'
    }
}

let store = createStore(reducer, initState);

// 对多个middleware 进行批量处理
const applyMiddleware = (...middlewares) => (store) => {
    // 依次获取使用的中间件
    const chain = middlewares.map(middleware => middleware(store));
    // 获取原本的 dispatch
    dispatch = store.dispatch;
    // 依次对store的dispatch进行中间件包装，按倒序封装
    chain.reverse().map(middleware => {dispatch = middleware(dispatch)});
    // 重新覆盖 store.dispatch
    store.dispatch = dispatch;
    return store;
}

// 对store 应用多个middleware
store = applyMiddleware(TimerMiddleware,ExceptionMiddleware,LoggerMiddleware)(store);

store.dispatch({type: 'INCREMENT'});

store.dispatch({type: 'SET_NAME', payload: { name: 'Reaper'}});

store.dispatch({type: 'DECREMENT'});

store.dispatch({type: 'SET_DESCRIPTION', payload: {description: 'A good person'}});

