const {app, BrowserWindow, Menu, ipcMain, screen} = require('electron');
const url = require('url');
const path = require('path');

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

let ventanaLogin
let ventanaPrincipal

app.on('ready', () => {
//Crea la ventana Login
  ventanaLogin = new BrowserWindow({webPreferences: {
    nodeIntegration: true,
    }, width: 290, height: 280, title: 'Ventana Login', resizable: false, minimizable: false
  });

  ventanaLogin.setMenu(null);
  ventanaLogin.loadURL(url.format({
    pathname: path.join(__dirname, 'views/login.html'),
    protocol: 'file', slashes: true
  }));

  ventanaLogin.on('closed', () =>{
  ventanaLogin=null;
  });
});

function crearVentanaPrincipal() {  
//Crea la ventana Principal
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  ventanaPrincipal = new BrowserWindow({webPreferences: {
    nodeIntegration: true,
    }, width, height, title: 'Ventana Principal'
  });

  ventanaPrincipal.loadURL(url.format({
    pathname: path.join(__dirname, 'views/index.html'),
    protocol: 'file', slashes: true
  }));

  ventanaPrincipal.on('closed', () =>{
      app.quit();
  });
}

ipcMain.on('newUsuario', (e, estadoUsuario) => {
  crearVentanaPrincipal();
  ventanaLogin.close();
});
