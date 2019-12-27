const  { createStore } =  require('./EasyState')

// 实际使用
let initState = {
    // 计数器state
    counter: {
        count: 0
    },
    // 个人信息state
    info: {
        name: '',
        description: ''
    }
}

// 创建一个store
let store = createStore(initState);

store.subscribe(() => {
    let state = store.getState();
    console.log(`${state.info.name} - ${state.info.description}`);
});

store.subscribe(() => {
    let state = store.getState();
    console.log(`${state.counter.count}`);
})

store.changeState(Object.assign(store.getState(), {
    info: {
        name: 'reaper',
        description: 'a front-end programmer'
    }
}));

store.changeState(Object.assign(store.getState(), {
    counter: {
        count : 1
    }
}))