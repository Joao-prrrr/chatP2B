// Script for the SPA
// Author : Joao Araribá & Lucas Soares
// Date : 4.5.2023 v1

// Message class
import {Manager} from "../modules/messageManager.js";
import {Message} from "../modules/Message.js";

// Show conversations


function printDiscution(user, token) {

    user.id = "312101c6-92a8-423b-b5cf-be2c060e24f4";
    token = "d5a2f3fa-a589-45ef-9132-2ecb23cbd93d";
    const listMessages = null;
    Manager.getMessages(token, user.id)
    .then((list) => {
        listMessages = list
        const contactName = document.querySelector("#contactName")
        const messageField = document.querySelector("#messageField")
        
        const userName = "Joao";
        const receiverName = user.id
        
        contactName.innerHTML = receiverName
        
        listMessages.forEach(message => {
            // console.log(message)
            if(message.sender.toLowerCase() === userName.toLowerCase() && message.receiver.toLowerCase() === receiverName.toLowerCase()){
                messageField.innerHTML += `<li class="me">${message.message}</li>`
            }
            else if(message.sender.toLowerCase() === receiverName.toLowerCase() && message.receiver.toLowerCase() === userName.toLowerCase()) {
                messageField.innerHTML += `<li class="contact">${message.message}</li>`
            }
            })
    })
    .catch(err => console.log(err))
    
}

export {printDiscution}
