const {app,BrowserWindow,Menu} = require('electron');
const { setMainMenu } = require('./menu');
const path = require('path')


console.log('hola emanuel!!!');


const crateWindow =()=>{
    const mainWindow = new BrowserWindow({
        width:700,
        height:700,
        minWidth:500,
        minHeight:500,
        webPreferences:{
            nodeIntegration:true,
            preload:path.join(__dirname,'preload.js')
            /* contextIsolation: false */
        
        }

    })

    mainWindow.loadFile('index.html')
    setMainMenu(mainWindow);
}




app.whenReady().then(()=>{
    crateWindow();
    

})



/* app.on('window-all-closed',()=>{
    if (process.platform === 'linux') {
        console.log(process.platform);
    }
}) */

