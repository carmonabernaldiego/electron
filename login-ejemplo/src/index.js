const { ipcRenderer } = require('electron')

let mylist;
let idproduct
let name;
let price;
let btnform;
let btnUpdate;
let btndelete;
let btnedit;
/*document.addEventListener("DOMContentLoaded", function() {
 })*/

window.onload = function() { 
   
   mylist = document.getElementById("mylist") 
   btnform = document.getElementById("btnform")
   btnUpdate = document.getElementById("btnUpdate")
   idproduct = document.getElementById("idproduct")
   name = document.getElementById("name")
   price = document.getElementById("price")
   btnform.onclick = renderAddProduct  
   btnUpdate.onclick = renderUpdateProduct 
   renderGetProducts() 
};


async function renderGetProducts() 
{
   await ipcRenderer.invoke('get')   
}

async function renderAddProduct() 
{
   const obj = {
      name:name.value,
      price: parseInt(price.value)
   }
   name.value = ""
   price.value = "" 
   await ipcRenderer.invoke('add', obj)  
  
   new Notification('Product', {
      body: 'added Product'
    })
}


ipcRenderer.on('products', (event, results) => {  
   let template = ""
   const list = results
   list.forEach(element => {
      template+=`
         <tr>
            <td>${element.name}</td>
            <td>${element.price}</td>
            <td>
              <button class="btn btn-danger"
                value="${element.id}"
                > 
                delete
              </button>
             </td>
             
             <td>
               <button class="btn btn-info"   
                 id="btnedit"
                 value="${element.id}"> 
                edit
              </button>
           
            </td>
         </tr>
      ` 
   });
     
   mylist.innerHTML = template 
   btndelete = document.querySelectorAll(".btn-danger")
   btndelete.forEach(boton =>{
     boton.addEventListener("click" , renderdeleteproduct)
  })

 btnedit = document.querySelectorAll(".btn-info")
 btnedit.forEach(boton =>{
    boton.addEventListener("click" , rendergetproduct)
 })

});


async function renderdeleteproduct(e)
{
  
   const obj = { id:parseInt(e.target.value)}
   await ipcRenderer.invoke('remove_product', obj)    
}

async function rendergetproduct(e)
{
   const obj = { id: parseInt(e.target.value)}
   await ipcRenderer.invoke("get_one" , obj)

}

ipcRenderer.on('product', (event, result) => {
   idproduct.value = result.id
   name.value = result.name
   price.value = result.price
});

async function renderUpdateProduct()
{
  const obj = {
     id: idproduct.value,
     name: name.value,
     price: price.value 
  }

  clearinput()
  await ipcRenderer.invoke("update" , obj)
}

function clearinput()
{
   idproduct.value =""
   name.value = ""
   price.value = ""
}

