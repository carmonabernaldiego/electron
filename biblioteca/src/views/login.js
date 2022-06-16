'use strict';

const { ipcRenderer } = require('electron');

let txtEmail;
let txtPassword;
let btnLogin;

window.onload = function () {
    txtEmail = document.getElementById("txtEmail");
    txtPassword = document.getElementById("txtPassword");
    btnLogin = document.getElementById("btnLogin");

    btnLogin.onclick = function () {
        if (txtEmail.value == '') {
            alert('Ingresá tú dirección de correo electrónico.');
        }else if (txtPassword.value == '') {
            alert('Ingresá tú contraseña.');
        } else {
            const obj = { email: txtEmail.value, password: txtPassword.value }

            ipcRenderer.invoke("login", obj);
        }
    }
}