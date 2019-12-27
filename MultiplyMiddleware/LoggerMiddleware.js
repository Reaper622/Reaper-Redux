const LoggerMiddleware = (store) => (next) => (action) => {
    console.log(`Before State is ${JSON.stringify(store.getState())}`)
    console.log(`Action type is ${action.type}`);
    next(action);
    console.log(`After State is ${JSON.stringify(store.getState())}`)
}

exports.LoggerMiddleware = LoggerMiddleware