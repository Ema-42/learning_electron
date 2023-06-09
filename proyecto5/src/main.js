const {ipcMain,pp,BrowserWindow,BrowserView, ipcRenderer} = require('electron')

const Task = require('./models/task');


function createWindow() {
    const win = new BrowserWindow({
        width:700,
        height:600,
        webPreferences:{
            nodeIntegration:true,
            contextIsolation:false
        }
    })
    win.loadFile(__dirname+'/index.html')
}

ipcMain.on('newTask',async(e,args) =>{
    // creando objeto
    const newTask = new Task(args);
    // guardando
    const taskSaved = await newTask.save();
    // respondiendo
    e.reply('new-task-created',JSON.stringify(taskSaved));

})


ipcMain.on('get-tasks',async (e,args)=>{
    const tasks = await  Task.find();
    e.reply('tasks-list',JSON.stringify(tasks))
})

ipcMain.on('deleteTask',async(e,args)=>{
    const taskDeleted = await Task.findByIdAndDelete(args);
    e.reply('delete-task-success',JSON.stringify(taskDeleted))
})


ipcMain.on('update-task',async(e,args)=>{
    const updatedTask = await Task.findByIdAndUpdate(
        args.idTaskToUpdate, {
            name:args.name,
            description:args.description},
            {new:true});
            e.reply('update-task-success',JSON.stringify(updatedTask))
        })
    

module.exports = {
    createWindow
};
