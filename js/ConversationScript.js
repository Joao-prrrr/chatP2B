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

        for(let index in listMessages.data){
            // console.log(message)
            let message = listMessages.data[index];
            if(message.sender === currentUser.id && message.receiver === contact.id){
                messageField.innerHTML += `<li class="me">${message.message}</li>`
            }
            else if(message.sender === contact.id && message.receiver === currentUser.toLowerCase()) {
                messageField.innerHTML += `<li class="contact">${message.message}</li>`
            }

        }
        
        // Writing messages

        const form = document.querySelector("#inputZone");
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const data = new FormData(form)

            let message = data.get("message")
            let result = Manager.sendMessage(contact, token, message);
            console.log(result)
        })
    })
    .catch(err => console.log(err))
    
}

export {printDiscution}
