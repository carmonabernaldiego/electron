const user = document.querySelector('#txtuser');
const name = document.querySelector('#txtname');
const pass = document.querySelector('#txtpass');
const button = document.querySelector('#btnRegistro');

button.addEventListener('click', () => {
    let usuario = user.value;
    let nombre = name.value;
    let password = pass.value;

    if (nombre == '') {
        alert('Ingrese un nombre, por favor.');
    } else if (usuario == '') {
        alert('Ingrese un usuario, por favor.');
    } else if (password == '') {
        alert('Ingrese una contraseña, por favor.');
    } else {
        let newUser = [{ user: usuario, pass: password, nombre: nombre }];

        localStorage.setItem('registro', JSON.stringify(newUser));

        document.querySelector('#txtuser').value = "";
        document.querySelector('#txtname').focus();
        document.querySelector('#txtname').value = "";
        document.querySelector('#txtpass').value = "";

        alert('Usuario registrado.');
        window.location.href = "index.html";
    }
});