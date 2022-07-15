const electronApp = require('electron').app;
const electronBrowserWindow = require('electron').BrowserWindow;
const electronIpcMain = require('electron').ipcMain;
const electronNotification = require('electron').Notification;
const Store = require('electron-store');
const store = new Store();
const path = require('path');

let db = require('./connection.js');

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
  const sql = "SELECT * FROM usuarios WHERE correo=? AND contrasena=?";

  db.query(sql, [email, password], (error, results, fields) => {
    if (error) {
      console.log(error);
    }

    if (results.length > 0) {
      store.set('user', results[0].usuario);
      store.set('email', results[0].correo);
      store.set('permissions', results[0].permiso);
      store.set('name', results[0].nombre);
      store.set('image', results[0].imagen);

      createWindowDashboard();
      window.show();
      loginWindow.close();
      window.maximize();
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
    store.delete('name');
    store.delete('image');

    createWindow();
    loginWindow.show();
    window.close();
  }
}

electronIpcMain.on('invitado', (event, permissions) => {
  store.set('permissions', permissions);

  createWindowDashboard();
  window.show();
  loginWindow.close();
  window.maximize();
});

electronIpcMain.handle('getUserData', (event) => {
  const data = { user: store.get('user'), email: store.get('email'), permissions: store.get('permissions'), image: store.get('image'), name: store.get('name') };

  return data;
});

electronIpcMain.handle('getBooks', (event) => {
  let isbn = '', nombre = '', carrera = '', ubicacion = '', editorial = '';

  db.query('SELECT * FROM `libros`', (error, results, fields) => {
    if (error) {
      console.log(error);
    }

    if (results.length > 0) {
      for (let i = 0; i < results.length; i++) {
        isbn += results[i].ISBN + '_';
        nombre += results[i].nombre + '_';
        carrera += results[i].carrera + '_';
        ubicacion += results[i].ubicacion + '_';
        editorial += results[i].editorial + '_';
      }

      store.set('isbnLibro', isbn);
      store.set('nombreLibro', nombre);
      store.set('carreraLibro', carrera);
      store.set('ubicacionLibro', ubicacion);
      store.set('editorialLibro', editorial);
    }
  });

  const data = { isbn: store.get('isbnLibro'), nombre: store.get('nombreLibro'), carrera: store.get('carreraLibro'), ubicacion: store.get('ubicacionLibro'), editorial: store.get('editorialLibro') };

  return data;
});

electronIpcMain.handle('addBook', (event, data) => {
  return addDB(data);
});

function addDB(data) {
  const { isbn, nombre, carrera, ubicacion, editorial } = data;
  const sql = "INSERT INTO libros (isbn, nombre, editorial, carrera, ubicacion) VALUES (?, ?, ?, ?, ?)";

  db.query(sql, [isbn, nombre, editorial, carrera, ubicacion], (error) => {
    if (error) {
      console.log(error);
      return false;
    } else {
      return true;
    }
  });
}