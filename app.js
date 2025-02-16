window.addEventListener('DOMContentLoaded', () => {
    console.log('Coffee Masters is loaded');

    // querySelector is used to get the first element that matches the selector
    let mainElement = document.querySelector('main');


    // we can use the innerHTML property to set the content of element
    mainElement.innerHTML = `
        <h1>
            Hello World, let's make some coffee
        </h1>
    `;

});