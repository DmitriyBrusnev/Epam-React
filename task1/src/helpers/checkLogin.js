export const checkIsLogin = () => JSON.parse(localStorage.getItem('login')) === true;