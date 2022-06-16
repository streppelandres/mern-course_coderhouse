const CHAT_UTILS = {
    messages: {
        elementId: 'chat-messages-container',
        toggleMessages: (toggle) => {
            document.getElementById(CHAT_UTILS.messages.elementId).style.display = toggle ? 'block' : 'none';
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

let isRegistered = CHAT_UTILS.register.isRegistered();
CHAT_UTILS.register.toggleRegister(!isRegistered);
CHAT_UTILS.messages.toggleMessages(isRegistered);

document.getElementById(CHAT_UTILS.register.buttonElementId).onclick = e => {
    CHAT_UTILS.register.registerButtonClick(e);
}

(async () => {
    


    
})();