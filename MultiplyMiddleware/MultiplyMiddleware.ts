interface Store {
    subscribe: Function,
    dispatch: Function,
    getState: Function
}

interface Action {
    type: string,
    payload?: object
}

interface CounterState {
    count: number
}

interface InfoState {
    name: string,
    description: string
}

interface State {
    counter: CounterState,
    info: InfoState
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
    function dispatch(action: Action): void {
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
        dispatch,
        getState
    }
}
// 根据两个State分类分离两个reducer的操作


// Counter 的 Reducer 接受和返回的都是 CounterState
function CounterReducer(state: CounterState, action: Action): CounterState {
    switch(action.type) {
        case 'INCREMENT': return {...state, count: state.count + 1}
        case 'DECREMENT': return {...state, count: state.count - 1}
        default: return state;
    }
}

// Info 的 Reducer 接受和返回的都是 InfoState
function InfoReducer(state: InfoState, action: Action): InfoState {
    switch(action.type) {
        case 'SET_NAME': return {...state, ...action.payload}
        case 'SET_DESCRIPTION': return {...state, ...action.payload}
        default : return state
    }
}


/**
 * 实现reducer的组合函数 combineReducers 函数
 * 
 * 传入的形式大概为
 * {
 *  counter: CounterReducer,
 *  info: InfoReducer
 * }
 */
function combineReducers(reducers: object): Function {
    const reducerKeys = Object.keys(reducers);
    // 返回一个新的 reducer函数
    return function (state: State, action: Action) {
        // 生成新的state
        const nextState = {}
        // 遍历执行所有的reducer 之后合并生成的结果
        for(let key of reducerKeys) {
            const reducer = reducers[key];
            // 之前对应key的上一个状态state
            const prevState = state[key];
            // 执行reducer 获取新的对应key的state
            const nextStateForKey = reducer(prevState, action);
            // 添加在新的state上
            nextState[key] = nextStateForKey;
        }
        // 返回新的state
        return nextState;
    }
}


export {createStore, CounterReducer, InfoReducer, combineReducers}