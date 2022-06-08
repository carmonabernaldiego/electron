const button = document.querySelector('#logout-btn');

if (localStorage.getItem('usuario')) {
    document.querySelector('#login-name').innerHTML = localStorage.getItem('usuario');
    document.querySelector('#sub-btn').remove();
    document.querySelector('#login-link').remove();
} else {
    document.querySelector('#logout-btn').remove();
    document.querySelector('#login-name').remove();
}

button.addEventListener('click', () => {
    localStorage.removeItem('usuario');
    alert('Cerrando Sesión...');
    window.location.href = "index.html";
});