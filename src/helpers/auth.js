import cookie from 'js-cookie'

/* set token in cookie */
export const setCookie = (key, value) => {
    if (window !== 'undefined') {
        cookie.set(key, value, {
            expires: 1       // 1 day
        })
    }
}

/* remove from cookie */
export const removeCookie = key => {
    if (window !== 'undefined') {
        cookie.remove(key, {
            expires: 1
        })
    }
}

/* get from cookie */
export const getCookie = key => {
    if(window !== 'undefined'){
        return cookie.get(key)
    }
}

/* set user in localstorage */
export const setLocalstorage = (key, value) => {
    if(window !== 'undefined'){
        localStorage.setItem(key, JSON.stringify(value))
    }
}

/* remove from localstorage */
export const removeLocalstorage = key => {
    if(window !== 'undefined'){
        localStorage.removeItem(key)
    }
}

/* Auth user after login */
export const authenticate = (response, next) => {
    setCookie('token', response.data.token)
    setLocalstorage('user', response.data.user)
    next();
}

/* signout */
export const signout = next => {
    removeCookie('token')
    removeLocalstorage('user')
    next();
}

/* get user from local storage after getting the token */
export const isAuth = () => {
    if(window !== 'undefined'){
        if(getCookie('token')){
            if(localStorage.getItem('user')){
                return JSON.parse(localStorage.getItem('user'))
            }else{
                return false;
            }
        }else{
            return false;
        }
    }
}

