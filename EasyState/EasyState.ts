interface Store {
    subscribe: Function,
    changeState: Function,
    getState: Function
}


const createStore = function (initState: object) : Store {
    // 定义状态为初始状态
    let state = initState;
    // 定义订阅者
    let listeners = [];

    // 订阅
    function subscribe(listener: Function): void {
        listeners.push(listener);
    }

    // 改变状态
    function changeState(newState: object): void {
        state = newState;
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


export {createStore}