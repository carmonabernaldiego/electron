'use strict'
const { ipcRenderer } = require('electron');

let txtEmail;
let txtPassword;
let btnLogin;

window.onload = function () {
    txtEmail = document.getElementById("email");
    txtPassword = document.getElementById("password");
    btnLogin = document.getElementById("login");

    btnLogin.onclick = function () {

        const obj = { email: txtEmail.value, password: txtPassword.value }

        ipcRenderer.invoke("login", obj)
    }
}