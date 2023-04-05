const marked = require('marked');

const markdownView = document.querySelector('#markdown')

const htmlView = document.querySelector('#html')


const toMarkdown = (markdonw) =>{
    htmlView.innerHTML = marked.parse(markdonw);
}


markdownView.addEventListener('keyup',e =>{
    // console.log(e.target.value);
    const currentContent = e.target.value;
    toMarkdown(currentContent)

})