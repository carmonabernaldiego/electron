'use strict';

const { ipcRenderer } = require('electron');

window.onload = function () {
    alert("hola");
    btnLogout = document.getElementById("btnLogout");

    btnLogout.onclick = function () {
        ipcRenderer.invoke("logout");
    }
}