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
        if (usuario == '') {
            alert('Ingrese usuario, por favor.');
        }
        if (password == '') {
            alert('Ingrese contraseña, por favor.');
        } else {
            const obj = { email: txtEmail.value, password: txtPassword.value }

            ipcRenderer.invoke("login", obj);
        }
    }
}