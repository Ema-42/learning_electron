const {contextBridge,ipcRenderer} = require('electron')


contextBridge.exposeInMainWorld('electronAPI',{
    onUpdateTheme :(callback) => ipcRenderer.on('change-theme',callback)
})