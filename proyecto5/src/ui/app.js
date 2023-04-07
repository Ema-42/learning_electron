const taskForm = document.querySelector('.taskForm')
const taskName = document.querySelector('#taskName')
const taskDescription = document.querySelector('#taskDescription')
const taskList = document.querySelector('#taskList')

const cantidad = document.querySelector('#cantidad')

const {ipcRenderer} = require('electron')


let tasks = [];
let updateStatus = false;
let idTaskToUpdate = ''

function deleteTask(id) {
    const result = confirm(`Delete this task? ID:${id}`)
    if (result) {
        ipcRenderer.send('deleteTask',id)
    }
    /* renderTasks() */
    return;

}

const recountTasks = (tasks)=>{
    return cantidad.innerHTML = `Cantidad : ${tasks.length}`
}


function editTask(id) {
    updateStatus = true;
    idTaskToUpdate = id;
    const task =  tasks.find(task=> task._id === id)
    taskName.value = task.name;
    taskDescription.value = task.description;
}


function renderTasks(tasks) {
    taskList.innerHTML =''
    tasks.map(t =>{
        taskList.innerHTML+=`
        <li>
        <p>ID: : ${t._id}</p>
        <p>Task name : ${t.name}</p>
        <p>Task description : ${t.description}</p>
        <p>Created at : ${(t.created_at)}</p>
        <button class="delete-btn"  onclick="deleteTask('${t._id}')">Delete</button>
        <button class="edit-btn"  type="button" onclick="editTask('${t._id}')">Edit</button>
        </li>
        `       
    })
    recountTasks(tasks)
}


taskForm.addEventListener('submit',async (e) =>{
    e.preventDefault();
    let day = new Date()
    const task= {
        name:taskName.value,
        description:taskDescription.value,
        created_at : Date.parse(day)
    }
    /* verificando estado */
    if (!updateStatus) {
        ipcRenderer.send('newTask',task)
    }else{
        updateStatus = false;
        ipcRenderer.send('update-task',{...task,idTaskToUpdate})
        
    }
    taskForm.reset();
    // console.log(taskName.value,taskDescription.value);
});



ipcRenderer.on('new-task-created',(e,args)=>{
    const newTask = JSON.parse(args)
    tasks.push(newTask);
    renderTasks(tasks);
    alert('Task created !!');
    console.log('newtask desde app',newTask);
    taskName.focus();

})


ipcRenderer.send('get-tasks');

ipcRenderer.on('tasks-list',(e,args)=>{
    const taskRecived = JSON.parse(args);
    tasks = taskRecived;
    renderTasks(tasks);
})

ipcRenderer.on('delete-task-success',(e,args)=>{
    const deletedTask = JSON.parse(args);
    const newTasks = tasks.filter(t =>{
        return t._id !== deletedTask._id;
    })
    tasks = newTasks;
    renderTasks(tasks)
})

ipcRenderer.on('update-task-success',(e,args)=>{
    const updatedTask = JSON.parse(args)
    tasks = tasks.map(t=>{
        if (t._id === updatedTask._id) {
            t.name = updatedTask.name;
            t.description = updatedTask.description
        }
        return t;
    })
    renderTasks(tasks);
    taskForm.reset();
})