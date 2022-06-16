'use strict';

const { app, BrowserWindow, ipcMain, Notification } = require('electron');
const path = require('path');

let db = require('./connection');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}
let window;
let windowLogin;

const createWindow = () => {
  // Create the browser window.
  window = new BrowserWindow({
    width: 900,
    height: 600,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      devTools: false
    }
  });

  // and load the index.html of the app.
  window.loadFile(path.join(__dirname, 'views/index.html'));

  window.maximize();

  // Open the DevTools.
  window.webContents.openDevTools();

  // and load the index.html of the ap.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTool.webContents.openDevTools();
};

const createWindowLogin = () => {
  // Create the browser window.
  windowLogin = new BrowserWindow({
    width: 500,
    height: 470,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      devTools: false,
      contextIsolation: false
    },
    maximizable: false,
    resizable: false
  });

  // and load the index.html of the app.
  windowLogin.loadFile(path.join(__dirname, 'views/login.html'));

  // Open the DevTools.
  windowLogin.webContents.openDevTools();

  // and load the index.html of the ap.loadFile(path.join(__dirname, 'login.html'));

  // Open the DevTool.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindowLogin);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

ipcMain.handle('login', (event, obj) => {
  validatelogin(obj);
});

function validatelogin(obj) {
  const { email, password } = obj;
  const sql = "SELECT * FROM users WHERE email=? AND pass=?";

  db.query(sql, [email, password], (error, results, fields) => {
    if (error) {
      console.log(error);
    }

    if (results.length > 0) {
      createWindow();
      window.show();
      windowLogin.close();
    } else {
      new Notification({
        title: "Inicia Sesión",
        body: 'Correo electrónico o contraseña equivocada.'
      }).show();
    }
  });
}