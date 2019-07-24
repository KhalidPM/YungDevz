
//sometimes the api returns a string and sometimes a JSON blob,
// this is a workaround to anticipate either one
export function getErrorAttributes(err){
    
    let errorDetails =  {}
    if (typeof err === 'string' || err instanceof String){
        errorDetails = {message: err}
    } if (err.message !== undefined) {
        errorDetails = {message: err.message};
        if(err.code !== undefined) errorDetails = {code: err.code, ...errorDetails}
        if(err.name !== undefined) errorDetails = {name: err.name, ...errorDetails}
    }
    else {
       errorDetails = {details: JSON.stringify(err)}
    }
    
    return {...errorDetails};
}