const user = document.querySelector('#txtuser');
const pass = document.querySelector('#txtpass');
const button = document.querySelector('#button');

let users;

let usersPreCargados = [{ user: 'admin', pass: 'root', nombre: 'Hiram Méndez' }, { user: 'editor', pass: '1234', nombre: 'Carlos López López' }, { user: 'diego', pass: 'diego97', nombre: 'Diego Carmona Bernal' }];

if (localStorage.getItem('registro')) {
    users = usersPreCargados;

    let registro = JSON.parse(localStorage.getItem('registro'));
    let newArray = users.concat(registro);

    users = newArray;
} else {
    users = usersPreCargados;
}

button.addEventListener('click', () => {
    let usuario = user.value;
    let password = pass.value;
    let error = true;

    if (usuario == '') {
        alert('Ingrese usuario, por favor.');
    }
    if (password == '') {
        alert('Ingrese contraseña, por favor.');
    } else {
        for (let i = 0; i < users.length; i++) {
            if (usuario === users[i].user && password === users[i].pass) {
                localStorage.setItem("usuario", users[i].nombre);
                alert('¡Bienvenido ' + users[i].nombre + '!');
                error = false;

                window.location.href = "index.html";
                break;
            }
        }
        if (error) {
            alert('¡Datos incorrectos!');
        }
    }
});