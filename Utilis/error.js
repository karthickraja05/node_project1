export const createErr = (status,message) => {
    const err = new Error();
    
    err.status = status;
    err.message = message;
    
    return err;
}

export const createSuccess = (status,message) => {
    return {
        status , message
    };
}