const { ipcRenderer } = require('electron')

let btnlogin;
let email; 
let password;

window.onload = function() { 
  email = document.getElementById("email")
  password = document.getElementById("password")
  btnlogin = document.getElementById("login")

  btnlogin.onclick = function(){
    
   const obj = {email:email.value, password:password.value }

    ipcRenderer.invoke("login", obj)
  }
}

