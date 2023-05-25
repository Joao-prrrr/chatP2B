// Script for the SPA
// Author : Joao Araribá & Lucas Soares
// Date : 4.5.2023 v1

// Message class
import {Manager} from "../modules/messageManager.js";
import {Message} from "../modules/Message.js";

// Show conversations


function printDiscution(contact, currentUser) {

    let token = currentUser.token;
    let listMessages = null;
    Manager.getMessages(token, contact.id)
    .then((list) => {
        listMessages = list
        const contactName = document.querySelector("#contactName")
        const messageField = document.querySelector("#messageField")
        
        const userName = currentUser.username;
        const receiverName = contact.name;
        
        contactName.innerHTML = receiverName

        for(let message in listMessages.data){
            // console.log(message)
            if(message.sender.toLowerCase() === userName.toLowerCase() && message.receiver.toLowerCase() === receiverName.toLowerCase()){
                messageField.innerHTML += `<li class="me">${message.message}</li>`
            }
            else if(message.sender.toLowerCase() === receiverName.toLowerCase() && message.receiver.toLowerCase() === userName.toLowerCase()) {
                messageField.innerHTML += `<li class="contact">${message.message}</li>`
            }

        }
        // listMessages.forEach(message => {
        //     })
    })
    .catch(err => console.log(err))
    
}

export {printDiscution}
