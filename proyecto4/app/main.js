const {app,BrowserWindow} = require('electron')


let mainWindow = null; 


app.on('ready',()=>{
    mainWindow = new BrowserWindow({
        width:800,
        height:500,
        webPreferences:{
            nodeIntegration:true,
            contextIsolation: false
        }
    })

    mainWindow.loadFile(__dirname+'/index.html')
})