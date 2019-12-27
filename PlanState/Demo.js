const {createStore, reducer} = require('./PlanState')

let initState = { 
    count : 0
}
// 为store添加处理函数plan
let store = createStore(reducer, initState);

store.subscribe(() => {
    let state = store.getState();
    console.log(state.count);
});

// count增加1
store.changeState({type: 'INCREMENT'})

// count减少1
store.changeState({type: 'DECREMENT'})

// 其他不符合规则的改变并不会影响状态
store.changeState({count: '123'});