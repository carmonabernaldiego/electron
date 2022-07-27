const electronApp = require('electron').app;
const electronBrowserWindow = require('electron').BrowserWindow;
const electronIpcMain = require('electron').ipcMain;
const Store = require('electron-store');
const store = new Store();
const path = require('path');
const db = require('./connection.js');

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
    icon: __dirname + '/assets/images/favicon.ico',
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

  window.webContents.openDevTools();
};

const createWindow = () => {
  // Create the browser window.
  loginWindow = new electronBrowserWindow({
    icon: __dirname + '/assets/images/favicon.ico',
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
  const sql = 'SELECT * FROM usuarios WHERE correo=? AND contrasena=?';

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
      window.loadFile(path.join(__dirname, 'views/consultar.html'));
      window.maximize();
      window.show();
      loginWindow.close();
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

    store.delete('idCarrera');
    store.delete('nombreCarrera');

    /*store.delete('isbn');
    store.delete('nombre');
    store.delete('carrera');
    store.delete('ubicacion');
    store.delete('editorial');*/

    store.delete('isbnL');
    store.delete('nombreL');
    store.delete('carreraL');
    store.delete('ubicacionL');
    store.delete('editorialL');

    store.delete('confirmAdd');
    store.delete('confirmUpdate');
    store.delete('confirmDelete');

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

electronIpcMain.on('consultBook', (event, ISBN) => {
  const sql = 'SELECT * FROM libros WHERE ISBN=?';

  db.query(sql, ISBN, (error, results) => {
    if (error) {
      console.log(error);
    }
    store.set('isbnL', results[0].ISBN);
    store.set('nombreL', results[0].nombre);
    store.set('carreraL', results[0].carrera);
    store.set('ubicacionL', results[0].ubicacion);
    store.set('editorialL', results[0].editorial);
  });
});

electronIpcMain.handle('getBook', (event) => {
  const data = { isbn: store.get('isbnL'), nombre: store.get('nombreL'), carrera: store.get('carreraL'), ubicacion: store.get('ubicacionL'), editorial: store.get('editorialL') };

  return data;
});

electronIpcMain.handle('getBooks', (event) => {
  let isbn = '', nombre = '', carrera = '', ubicacion = '', editorial = '';

  db.query('SELECT * FROM libros INNER JOIN carreras ON carreras.id_carrera = libros.carrera', (error, results, fields) => {
    if (error) {
      console.log(error);
    }

    if (results.length > 0) {
      for (let i = 0; i < results.length; i++) {
        isbn += results[i].ISBN + '_';
        nombre += results[i].nombre + '_';
        carrera += results[i].nombre_carrera + '_';
        ubicacion += results[i].ubicacion + '_';
        editorial += results[i].editorial + '_';
      }

      store.set('isbn', isbn);
      store.set('nombre', nombre);
      store.set('carrera', carrera);
      store.set('ubicacion', ubicacion);
      store.set('editorial', editorial);
    }
  });

  const data = { isbn: store.get('isbn'), nombre: store.get('nombre'), carrera: store.get('carrera'), ubicacion: store.get('ubicacion'), editorial: store.get('editorial') };

  return data;
});

electronIpcMain.handle('confirmAddBook', (event) => {
  return store.get('confirmAdd');
});

electronIpcMain.on('addBook', (event, data) => {
  addDB(data);
});

function addDB(data) {
  const { isbn, nombre, carrera, ubicacion, editorial } = data;
  const sql = 'INSERT INTO libros (isbn, nombre, editorial, carrera, ubicacion) VALUES (?, ?, ?, ?, ?)';

  db.query(sql, [isbn, nombre, editorial, carrera, ubicacion], (error) => {
    if (error) {
      console.log(error);
      store.set('confirmAdd', 0);
    } else {
      store.set('confirmAdd', 1);
    }
  });
}

electronIpcMain.handle('confirmUpdateBook', (event) => {
  return store.get('confirmUpdate');
});

electronIpcMain.on('updateBook', (event, data) => {
  updateDB(data);
});

function updateDB(data) {
  const { isbn, nombre, carrera, ubicacion, editorial } = data;
  const sql = 'UPDATE libros SET nombre=?, editorial=?, carrera=?, ubicacion=? WHERE ISBN=?';

  db.query(sql, [nombre, editorial, carrera, ubicacion, isbn], (error) => {
    if (error) {
      console.log(error);
      store.set('confirmUpdate', 0);
    } else {
      store.set('confirmUpdate', 1);
    }
  });
}

electronIpcMain.handle('confirmDeleteBook', (event) => {
  return store.get('confirmDelete');
});

electronIpcMain.on('deleteBook', (event, ISBN) => {
  deleteDB(ISBN);
});

function deleteDB(ISBN) {
  const sql = 'DELETE FROM libros WHERE ISBN = ?';

  db.query(sql, [ISBN], (error) => {
    if (error) {
      console.log(error);
      store.set('confirmDelete', 0);
    } else {
      store.set('confirmDelete', 1);
    }
  });
}

electronIpcMain.on('consultCarreras', (event) => {
  let idCarrera = '', nombreCarrera = '';

  db.query('SELECT * FROM carreras', (error, results, fields) => {
    if (error) {
      console.log(error);
    }

    if (results.length > 0) {
      for (let i = 0; i < results.length; i++) {
        idCarrera += results[i].id_carrera + '_';
        nombreCarrera += results[i].nombre_carrera + '_';
      }

      store.set('idCarrera', idCarrera);
      store.set('nombreCarrera', nombreCarrera);
    }
  });
});

electronIpcMain.handle('getCarreras', (event) => {
  const data = { idCarrera: store.get('idCarrera'), nombreCarrera: store.get('nombreCarrera') };

  return data;
});