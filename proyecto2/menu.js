const {app,Menu} = require('electron')


const setMainMenu = (mainWindow) =>{
    const template = [
        {
            label: app.name,
            accelerator:"Ctrl+F"

        },
        {
            label:"Theme",
            submenu:[
                {
                    label:"light",
                    click(){
                        mainWindow.webContents.send("change-theme","light")
                    }
                },
                {
                    label:"dark",
                    click(){
                        mainWindow.webContents.send("change-theme","dark")
                    }
                }
            ]
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
        },
        {
            label: 'View',
            submenu: [
              { role: 'reload' },
              { role: 'forceReload' },
              { role: 'toggleDevTools' },
              { type: 'separator' },
              { role: 'resetZoom' },
              { role: 'zoomIn' },
              { role: 'zoomOut' },
              { type: 'separator' },
              { role: 'togglefullscreen' }
            ]
          },
        {
            label: "Option",
            submenu:[
                {
                    label:"submenu 1"
                },
                {
                    type:"separator"
                },
                {
                    label:"submenu 2"
                }
            ]
        }
        
    ]
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
}


module.exports = {setMainMenu}