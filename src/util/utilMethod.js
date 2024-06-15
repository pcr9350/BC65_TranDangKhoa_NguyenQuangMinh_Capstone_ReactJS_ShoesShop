// Các hàm để thao tác với localStorage
const getDataTextStorage = (storeName) => {
    if (localStorage.getItem(storeName)) {
        return localStorage.getItem(storeName);
    }
    return null;
}

const getDataJsonStorage = (storeName) => {
    if (localStorage.getItem(storeName)) {
        return JSON.parse(localStorage.getItem(storeName));
    }
    return null;
}

const setDataTextStorage = (storeName, data)=> {
    localStorage.setItem(storeName, data);
}

const setDataJsonStorage = (storeName, data) => {
    localStorage.setItem(storeName, JSON.stringify(data));
}

// Các hàm để thao tác với cookie
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function delCookie(name) {   
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

export { setCookie, getCookie, delCookie, getDataTextStorage, getDataJsonStorage, setDataTextStorage, setDataJsonStorage }
