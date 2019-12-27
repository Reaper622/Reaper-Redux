interface Store {
    subscribe: Function,
    changeState: Function,
    getState: Function
}

interface Action {
    type: string,
    payload?: object
}

interface State {
    count: number
}

const createStore = function (reducer: Function, initState: State) : Store {
    // 定义状态为初始状态
    let state = initState;
    // 定义订阅者
    let listeners = [];

    // 订阅
    function subscribe(listener: Function): void {
        listeners.push(listener);
    }

    // 改变状态
    function changeState(action: Action): void {
        // 按照reducer定义进行对state的更改
        state = reducer(state, action)
        for(let listener of listeners) {
            listener();
        }
    }
    // 返回状态 使用了闭包
    function getState(): object {
        return state;
    }

    return {
        subscribe,
        changeState,
        getState
    }
}

// 定义一个状态的变化函数，根据传入的状态以及定义的改变action 返回一个新的状态
function reducer(state: State, action: Action): State {
    switch(action.type) {
        case 'INCREMENT': return {...state, count: state.count + 1}
        case 'DECREMENT': return {...state, count: state.count - 1}
        default: return state;
    }
}


export {createStore, reducer}