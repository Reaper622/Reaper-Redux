const {createStore, CounterReducer, InfoReducer, combineReducers} = require('./MultiplyState')

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

store.subscribe(() => {
    let state = store.getState();
    console.log(state);
})

store.dispatch({type: 'INCREMENT'});

store.dispatch({type: 'SET_NAME', payload: { name: 'Reaper'}});

store.dispatch({type: 'DECREMENT'});

store.dispatch({type: 'SET_DESCRIPTION', payload: {description: 'A good person'}});

