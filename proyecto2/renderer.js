/* const { ipcRenderer } = require("electron");
 */
const $ = selector => document.querySelector(selector);

const $count = $('#count') 
const $button = $('button')

$button.addEventListener('click',()=>{
    const count  = +$count.innerHTML;
    $count.innerHTML = (count +1).toString();

})

window.electronAPI.onUpdateTheme((event,theme)=>{
    const root = document.documentElement
    console.log(event,theme);
    root.style.setProperty('--scheme',theme)
})
/* 
ipcRenderer.on('theme',(event,theme)=>{
    console.log(event,theme);
}) */