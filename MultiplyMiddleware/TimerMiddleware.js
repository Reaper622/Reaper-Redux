const TimerMiddleware = (store) => (next) => (action) => {
    console.log('time start!')
    console.time();
    next(action);
    console.timeEnd();
}


exports.TimerMiddleware = TimerMiddleware