const { app, BrowserWindow, ipcMain, Notification } = require('electron');
const path = require('path'); 
let db = require('./database')

let win;
let winlogin;
function createWindow () {
   win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
     // nodeIntegration: true,
     // contextIsolation:true,
     // devTools:false,
      preload:path.join(__dirname, 'index.js')
      
    }
  })

  win.loadFile('index.html')
}

function loginWindow () {
  winlogin = new BrowserWindow({
   width: 800,
   height: 600,
   webPreferences: {
    // nodeIntegration: true,
    // contextIsolation:true,
    // devTools:false,
     preload:path.join(__dirname, 'login.js')
     
   }
 })

 winlogin.loadFile('login.html')
}



app.whenReady().then(loginWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

ipcMain.handle('login', (event, obj) => {
  validatelogin(obj)
});


function validatelogin(obj) {
 const { email, password } = obj 
 const sql = "SELECT * FROM user WHERE email=? AND password=?"
  db.query(sql, [email, password], (error, results, fields) => {
    if(error){ console.log(error);}

    if(results.length > 0){
       createWindow ()
       win.show()
       winlogin.close()
     }else{
       new Notification({
         title:"login",
         body: 'email o password equivocado'
       }).show()
     }
    
  });
}



ipcMain.handle('get', () => {
   getProducts()
});


ipcMain.handle('add', (event, obj) => {
  addProduct(obj)
});


ipcMain.handle('get_one', (event, obj) => {
  getproduct(obj)    
});


ipcMain.handle('remove_product', (event, obj) => {
  deleteproduct(obj)
});


ipcMain.handle('update', (event, obj) => {
  updateproduct(obj)    
});


function getProducts()
{
  
  db.query('SELECT * FROM product', (error, results, fields) => {
    if (error){
      console.log(error);
    }
    
    win.webContents.send('products', results)
  });  
}


function addProduct(obj)
{
  const sql = "INSERT INTO product SET ?";  
  db.query(sql, obj, (error, results, fields) => {
    if(error) {
       console.log(error);
    }
    getProducts()  
 });
}


function deleteproduct(obj)
{
  const { id }  = obj
  const sql = "DELETE FROM product WHERE id = ?"
  db.query(sql, id, (error, results, fields) => {
    if(error) {
       console.log(error);
    }
    getProducts()  
  });
}


function getproduct(obj)
{
  let { id } = obj 
  let sql = "SELECT * FROM product WHERE id = ?"
  db.query(sql, id, (error, results, fields) => {
    if (error){
      console.log(error);
    }
    console.log(results)
    win.webContents.send('product', results[0])
  });
}


function updateproduct(obj) 
{
   let { id, name, price } = obj
   const sql = "UPDATE product SET name=?, price=? WHERE id=?";  
   db.query(sql, [name, price, id], (error, results, fields) => {
     if(error) {
        console.log(error);
     }
     getProducts()  
   });
}


