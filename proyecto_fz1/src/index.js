const {app,BrowserWindow, protocol, Menu,globalShortcut,ipcMain} = require('electron');
const url = require('url');
const path = require('path');
const { log } = require('console');

// verificar entornno de ejecucion

if (process.env.NODE_ENV !=='production'){
    require('electron-reload')(__dirname,{
        electron: path.join(__dirname,'../node_modules','.bin','electron')
    })
}



let mainWindow;
let newProductWindow;



app.on('ready',()=>{
    mainWindow =  new BrowserWindow({
        width: 700,
         height: 700 ,
         webPreferences:{
            nodeIntegration: true,
            contextIsolation: false
        }});
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname,'views/index.html'),
        protocol:'file',
        slashes:true
    }))
    const mainMenu = Menu.buildFromTemplate(templateMenu);
    Menu.setApplicationMenu(mainMenu);  
    mainWindow.on('closed',()=>{
        app.quit();
    });
});



function createnewProductWindow() {
    newProductWindow = new BrowserWindow({
        width: 700,
        height: 700,
        title: 'Add a new product',
        webPreferences:{
            nodeIntegration: true,
            contextIsolation: false
        }
    })
    /* newProductWindow.setMenu(null); */
    newProductWindow.loadURL(url.format({
        pathname: path.join(__dirname,'views/new_product.html'),
        protocol:'file',
        slashes:true
    }))

    newProductWindow.on('closed',()=>{
        newProductWindow = null;
    })
}


ipcMain.on('product:new',(e,newProduct)=>{
    mainWindow.webContents.send('product:new',newProduct);
    /* newProductWindow.close(); */
})


const templateMenu= [
    {
        label:'File',
        submenu:[
            {
                accelerator:'Ctrl+T',
                label:'new prouct',
                click(){
                    createnewProductWindow();
                }
            },
            {
                label:'Remove all products',
                click(){
                    mainWindow.webContents.send('products:remove-all')
                }
            },
            {
                label:'Exit',
                // verificando so
                accelerator:process.platform =='darwin'?'Command+Q':'Ctrl+W',
                click(){
                    app.quit();
                }
            },
            {
                label:'About me',
                accelerator:'Alt+Q'
            }
            
        ]
    }
];

/* para macos */
if(process.platform =='darwin'){
    templateMenu.unshift({
        label:app.getName()
    });
}

if(process.env.NODE_ENV !== 'production'){
    templateMenu.push({
        label:'DevTools',
        submenu:[
            {
                label:'Show / Hide Dev Tools',
                accelerator:'Ctrl+D',
                click(item,focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },
            {
                label:'reload',
                click(){

                }
            }
        ]
    })
}