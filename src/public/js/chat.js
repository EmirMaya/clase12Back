let userName;
const nameP = document.getElementById('inpName');
const price = document.getElementById('inpPrice');
const url = document.getElementById('inpUrl');
// let product = {
//     nombre: nameP,
//     precio: price,
//     foto: url
// }
const chatBox = document.getElementById('chatBox');
const butProd = document.getElementById('buttonProd');
const socket = io({
    autoConnect: false
});

Swal.fire({
    title: "Identificate",
    input: "text",
    text: "Ingresa el usuario con el que te identificaras en el chat",
    inputValidator: (value) => {
        return !value && "Necesitas identificarte para poder continuar"
    },
    allowOutsideClick: false,
    allowEscapeKey: false
}).then(result => {
    userName = result.value;
    socket.connect();
    console.log(userName);
})

/*Listeners*/

chatBox.addEventListener('keyup', evt => {

    if (evt.key === 'Enter') {
        if (chatBox.value.trim().length > 0) {
            socket.emit('message', { user: userName, message: chatBox.value })
            chatBox.value = "";
        }
    }
})

butProd.addEventListener('click', evt => {
    let prod = { name: nameP.value, precio: price.value, foto: url.value };
  
        if (nameP.value.trim().length > 0 && price.value.trim().length > 0 && url.value.trim().length > 0) {
            socket.emit('product', prod);
            //    console.log(prod);
            nameP.value = "";
            price.value = "";
            url.value = "";
        }
   

})


socket.on('printProd', data => {
    console.log('DATA PASO FINAL');
    console.log(data);
    let printProd = document.getElementById('prodsView')
    let products  = "";
    data.forEach(prod => {
        products = products + `<p class="txt">${prod.name}</p>  <p class="txt">$ ${prod.precio}</p> <img class="img" src="${prod.foto}" alt="foto">`
    })
    printProd.innerHTML = products;
})

socket.on('log', data => {
    let log = document.getElementById('log');
    let messages = "";
    data.forEach(message => {
        messages = messages + `${message.user} dice: ${message.message}</br>`;

    })
    log.innerHTML = messages;
})


socket.on('newUser', data => {
    if (userName) {
        Swal.fire({
            text: "Nuevo usuario en el chat",
            toast: true,
            position: "top-right"
        })
    }
})