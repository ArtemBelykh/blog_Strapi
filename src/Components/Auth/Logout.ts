export const Logout = () => {
    if (window.sessionStorage.getItem('jwt')) {
        window.sessionStorage.removeItem('jwt')
        return window.location.href = '/'

    }
};