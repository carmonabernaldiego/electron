const electronApp = require('electron').app;
const electronBrowserWindow = require('electron').BrowserWindow;
const electronIpcMain = require('electron').ipcMain;
const electronNotification = require('electron').Notification;
const Store = require('electron-store');
const store = new Store();
const path = require('path');

let db = require('./connection');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  electronApp.quit();
}

let window;
let loginWindow;

const createWindowDashboard = () => {
  // Create the browser window.
  window = new electronBrowserWindow({
    width: 900,
    height: 600,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      devTools: false,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // and load the index.html of the app.
  window.loadFile(path.join(__dirname, 'views/index.html'));

  // Open the DevTools.
  window.webContents.openDevTools();

  // and load the index.html of the ap.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTool.webContents.openDevTools();

  window.maximize();
};

const createWindow = () => {
  // Create the browser window.
  loginWindow = new electronBrowserWindow({
    width: 500,
    height: 470,
    resizable: false,
    maximizable: false,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      devTools: false,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // and load the index.html of the app.
  loginWindow.loadFile(path.join(__dirname, 'views/login.html'));

  // Open the DevTools.
  loginWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

electronApp.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
electronApp.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    electronApp.quit();
  }
});

electronApp.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (electronBrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

electronIpcMain.on('login', (event, data) => {
  validateLogin(data);
});

function validateLogin(data) {
  const { email, password } = data;
  const sql = "SELECT * FROM users WHERE email=? AND pass=?";

  db.query(sql, [email, password], (error, results, fields) => {
    if (error) {
      console.log(error);
    }

    if (results.length > 0) {
      store.set('user', results[0].user);
      store.set('email', results[0].email);
      store.set('permissions', results[0].permissions);
      store.set('image', results[0].image);

      const sql = "SELECT * FROM administratives WHERE user=?";

      db.query(sql, [store.get('user')], (error, results, fields) => {
        if (error) {
          console.log(error);
        }

        if (results.length > 0) {
          store.set('name', results[0].name);
          store.set('surnames', results[0].surnames);

          createWindowDashboard();
          window.show();
          loginWindow.close();
        }
      });
    } else {
      new electronNotification({
        title: "Inicia Sesión",
        body: 'Correo electrónico o contraseña equivocada.'
      }).show();
    }
  });
}

electronIpcMain.on('logout', (event, confirm) => {
  validateLogout(confirm);
});

function validateLogout(confirm) {
  if (confirm == 'confirm-logout') {
    store.delete('user');
    store.delete('email');
    store.delete('permissions');
    store.delete('image');

    createWindow();
    loginWindow.show();
    window.close();
  }
}

electronIpcMain.on('invitado', (event) => {
  createWindowDashboard();
  window.show();
  loginWindow.close();
});

electronIpcMain.handle('getUserData', (event) => {
  const data = { user: store.get('user'), email: store.get('email'), permissions: store.get('permissions'), image: store.get('image'), name: store.get('name'), surnames: store.get('surnames') };

  return data;
});