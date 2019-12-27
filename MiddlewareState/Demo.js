const {createStore, CounterReducer, InfoReducer, combineReducers} = require('./MiddlewareState')

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
// 获取原来的dispatch
const next = store.dispatch;

// 重写 dispatch 但不影响原来 dispatch 的功能，并同时记录异常
store.dispatch = (action) => {
    try {
        console.log('middleware invoked');
        console.log(`Before State is ${JSON.stringify(store.getState())}`)
        console.log(`Action type is ${action.type}`);
        next(action);
        console.log(`After State is ${JSON.stringify(store.getState())}`)
    } catch(err) {
        console.error(err);
    }
}

store.dispatch({type: 'INCREMENT'});

store.dispatch({type: 'SET_NAME', payload: { name: 'Reaper'}});

store.dispatch({type: 'DECREMENT'});

store.dispatch({type: 'SET_DESCRIPTION', payload: {description: 'A good person'}});

