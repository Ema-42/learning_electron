const {app,BrowserWindow, Tray,Menu} = require('electron');
const path = require('path');

let mainWindow = null;
let appIcon = null

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        // show:false,
        webPreferences:{
            nodeIntegration:true,
            contextIsolation: false
        },
        height:1000,
        width:600,
        roundedCorners:true,

        // skipTaskbar: true,
        minimizable: false,
        maximizable: false,
        fullscreenable: false,
        resizable: false,
    });

    mainWindow.loadFile(__dirname+'/view/index.html')

    // mainWindow.hide();

    // Crea un ícono en la bandeja del sistema
    appIcon = new Tray(path.join(__dirname, 'icon', 'icon.png'));

    //abrir app con click
    appIcon.on('click', () => {
        // // Get the bounds of the tray icon
        // const trayBounds = appIcon.getBounds();
        // // Get the size of the window
        // const windowBounds = mainWindow.getBounds();
        // // Calculate the x and y positions for the window
        // const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2));
        // const y = Math.round(trayBounds.y + trayBounds.height + 2);
        // // Set the position of the window
        // mainWindow.setPosition(x, y, false);
        mainWindow.show();
      });



    // Agrega un menú al ícono en la bandeja del sistema
    const contextMenu = Menu.buildFromTemplate([
        {
        label: 'Mostrar', click: function () {
            mainWindow.show();
        }
        },
        {
        label: 'Cerrar aplicación', click: function () {
            app.quit();
        }
        }
    ]);

    appIcon.setToolTip('Demo App');
    appIcon.setContextMenu(contextMenu);

    // Establece la propiedad skipTaskbar en true para que el ícono no se muestre en la barra de tareas
    // mainWindow.setSkipTaskbar(true);

})



