const { shell } = require("electron");

const linksSection = document.querySelector('.links');

const errorMessage = document.querySelector('.error-message');
const newLinkForm = document.querySelector('.new-link-form');
const newLinkUrl = document.querySelector('.new-link-url');
const newLinkButton = document.querySelector('.new-link-button');
const clearStorageButton = document.querySelector('.clear-storage');


//dom apis

const parser = new DOMParser();

const parserResponse = text=>{
    return parser.parseFromString(text,'text/html')
}



const findTitle =(nodes)=> {
    return nodes.querySelector('title').innerText;

}

const storeLinks = (title,url)=>{
    localStorage.setItem(url,JSON.stringify({title,url}))
}


const getLinks = ()=>{
    return Object.keys(localStorage)
        .map(key=>JSON.parse(localStorage.getItem(key)))
}

const createLinksELement = link =>{
    return `
    <div>
        <h3>${link.title}</h3>
        <p>
            <a href="${link.url}">${link.url}</a>
        </p>   
    </div>
    `
}

const renderLinks = ()=>{
    const linksElements = getLinks().map(createLinksELement).join('')
    linksSection.innerHTML = linksElements;
}

const clearForm = ()=>{
    newLinkUrl.value = 'https://';
    newLinkUrl.innerHTML = 'https://';
}

const handleError =(error,url)=>{
    errorMessage.innerText = `
    There as an issue adding "${url}" : ${error.message}
    `.trim();
    setTimeout(() =>{
        errorMessage.innerHTML = null;
    }, 6000);}


//events

renderLinks();

newLinkUrl.addEventListener('keyup',()=>{
    newLinkButton.disabled = !newLinkUrl.validity.valid;

})

newLinkForm.addEventListener('submit',async(e)=>{
    e.preventDefault();
    const url = newLinkUrl.value;
    try {
        const response = await fetch(url);
        const text =  await response.text();
        const html = parserResponse(text);
        const title = findTitle(html)
        storeLinks(title,url)
        clearForm();
        renderLinks();
    } catch (error) {
        console.log(url);
        handleError(error,url)
    }
    })


clearStorageButton.addEventListener('click',() =>{
    localStorage.clear();
    linksSection.innerHTML = '';
})

linksSection.addEventListener('click',(e)=>{
    if (e.target.href) {
        e.preventDefault();
        shell.openExternal(e.target.href);
    }
})