const CHAT_UTILS = {
    messages: {
        elementId: 'chat-messages-container',
        displayElementId: 'chat-messages-display',
        buttonElementId: 'chat-message-button',
        toggleMessages: (toggle) => {
            document.getElementById(CHAT_UTILS.messages.elementId).style.display = toggle ? 'block' : 'none';
        },
        getAllMessages: async () => {
            const response = await fetch('/messages');
            const messages = JSON.parse(await response.text());
            console.table(messages);

            document.getElementById(CHAT_UTILS.messages.displayElementId).innerHTML = messages.map(messageData => {
                return CHAT_UTILS.messages.buildMessage(messageData);
            }).join('');
        },
        buildMessage: (messageData) => {
            const { author, message, time, id } = messageData;
            return (`
                <p id="${id}">
                    <span>${time}</span>
                    <span>${author}</span>
                    <span>${message}</span>
                </p>
            `);
        },
        appendNewMessage: (messageData) => {
            document.getElementById(CHAT_UTILS.messages.displayElementId).innerHTML += CHAT_UTILS.messages.buildMessage(messageData);
        },
        getMessageData: () => {
            const messageInput = document.getElementById('chat-message-msg');
            const message = messageInput.value;

            messageInput.value = '';

            if(message == '') {
                let errorMessage = 'Tenes que ingresar un mensaje para poder enviar';
                alert(errorMessage)
                throw errorMessage;
            }
            
            return {
                author: CHAT_UTILS.register.getRegisterEmail(),
                message: message
            }
        },
        sendMessage: (messageData) => {
            SOCKET.emit('messages-send', messageData);
        },
        messagesButtonClick: (e) => {
            e.preventDefault();
            const messageData = CHAT_UTILS.messages.getMessageData();
            CHAT_UTILS.messages.sendMessage(messageData);
        }
    },
    register: {
        elementId: 'chat-register-container',
        inputElementId: 'chat-register-input',
        buttonElementId: 'chat-register-button',
        storageItemKey: 'chat-user-email',
        isRegistered: () => {
            return CHAT_UTILS.register.getRegisterEmail() !== null;
        },
        saveRegister: (email) => {
            localStorage.setItem(CHAT_UTILS.register.storageItemKey, email);
        },
        toggleRegister: (toggle) => {
            document.getElementById(CHAT_UTILS.register.elementId).style.display = toggle ? 'block' : 'none';
        },
        getRegisterEmail: () => {
            return localStorage.getItem(CHAT_UTILS.register.storageItemKey);
        },
        getEmail: () => {
            return document.getElementById(CHAT_UTILS.register.inputElementId).value;
        },
        registerButtonClick: (e) => {
            e.preventDefault();
            let email = CHAT_UTILS.register.getEmail();
            CHAT_UTILS.register.saveRegister(email);
            CHAT_UTILS.register.toggleRegister(false);
            CHAT_UTILS.messages.toggleMessages(true);
        }
    }
};

// Me fijo si ya está registrado
let isRegistered = CHAT_UTILS.register.isRegistered();
CHAT_UTILS.register.toggleRegister(!isRegistered);
CHAT_UTILS.messages.toggleMessages(isRegistered);

// Bind al hacer click en el botón de registrarse
document.getElementById(CHAT_UTILS.register.buttonElementId).onclick = e => CHAT_UTILS.register.registerButtonClick(e);

(async () => {
    // De primeras cargo todos los mensajes guardados
    await CHAT_UTILS.messages.getAllMessages();
})();

document.getElementById(CHAT_UTILS.messages.buttonElementId).onclick = e => CHAT_UTILS.messages.messagesButtonClick(e);

SOCKET.on('messages-append', (messageData) => {
    CHAT_UTILS.messages.appendNewMessage(messageData);
});