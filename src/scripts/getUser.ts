export const getUser = () => {
    let user = JSON.parse(localStorage.getItem('user') || '{}');
    // get user from session storage if user is not in local storage
    if (user.id === undefined) {
        user = JSON.parse(sessionStorage.getItem('user') || '{}');
    }
    return user;
}