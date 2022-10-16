export const getSession = () => {
    return JSON.parse(localStorage.getItem('session'));
};
/**
 * setToken from localstorage
*/
export const setSessionInLocalStorage = (token) => {
    if(token){
        localStorage.setItem('session', JSON.stringify(token))
    }
    return true
};
