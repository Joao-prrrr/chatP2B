// Script for the SPA
// Author : Joao Araribá & Lucas Soares
// Date : 4.5.2023 v1

// Message class
import {Message as MessageManager} from "../modules/messageManager.js";

// Show conversations

const listMessages = MessageManager.getMessages()

const contactName = document.querySelector("#contactName")
const messageField = document.querySelector("#messageField")


const userName = "Lucas";
// const receiverName = "Lucas"

window.addEventListener("locationchange", () => {
    const path = window.location.path 
    const receiverName = path.slice(path.indexOf("/", 2)+1)
    
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
