const {app,BrowserWindow} = require('electron');


let mainWindow = null;

app.on('ready',()=>{
    mainWindow = new BrowserWindow({
        show:false,
        webPreferences:{
            nodeIntegration:true,
            contextIsolation: false
        }
    });

    mainWindow.loadFile(__dirname+'/index.html')
    mainWindow.once('ready-to-show',()=>{
        // mostrar solo ventana cargada
        mainWindow.show();

    })
    mainWindow.on('closed',()=>{
        mainWindow=null;
    })
})

console.log('hello word');
