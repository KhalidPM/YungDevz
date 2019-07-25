import Analytics from '@aws-amplify/analytics';
import analyticsEvents from 'config/analyticsEvents'

export function logActionError(err, type){
    console.log('error adding class...', err)
    Analytics.record({
        name: analyticsEvents.action_failed,
        attributes:  {type: type, ...getErrorAttributes(err)}   
      })
}
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
       errorDetails = {details: JSON.stringify(err).substring(0, 199)} //service doesn't accept longer events than 200 chars
    }

    return {...errorDetails};
}