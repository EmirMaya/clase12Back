let userName;
const chatBox = document.getElementById('chatBox');
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
            text:"Nuevo usuario en el chat",
            toast:true,
            position:"top-right"
        })
    }
})