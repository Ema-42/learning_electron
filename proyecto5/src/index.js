const {createWindow} = require('./main');
 
const {app} = require('electron')


require('./database');


app.on('ready',()=>{
    createWindow();
})