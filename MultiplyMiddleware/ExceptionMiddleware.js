const ExceptionMiddleware = (store) => (next) => (action) => {
    try {
        console.log('checkException');
        next(action);
        console.log('checkException Finished!')
    } catch (err) {
        console.error(err);
    }
}

exports.ExceptionMiddleware = ExceptionMiddleware