// Script for the SPA
// Author : Joao Araribá & Lucas Soares
// Date : 4.5.2023 v1

// Message class
import {Manager} from "../modules/messageManager.js";
import {Message} from "../modules/Message.js";

// Show conversations
const sendBtn = document.querySelector("#sendBtn");
const form = document.querySelector("#inputZone")

form.addEventListener("submit", (e) => e.preventDefault())

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
        messageField.innerHTML = "";

        for(let index in listMessages.data){
            // console.log(message)
            let message = listMessages.data[index]; 
            if(message.sender === currentUser.id && message.receiver === contact.id){
                messageField.innerHTML += `<li class="me">${message.message}</li>`
            }
            else if(message.sender === contact.id && message.receiver === currentUser.id) {
                messageField.innerHTML += `<li class="contact">${message.message}</li>`
            }

        }
        
        
    })
    .catch(err => console.log(err))
    
}
let funEvent = null;
function writingMessages(contact, currentUser) {
    // Writing messages
    funEvent = () => {enableMesssages(contact, currentUser)}
    sendBtn.addEventListener("click", funEvent)

}

function quitMessages() {
    sendBtn.removeEventListener("click", funEvent);
}

function enableMesssages(contact, currentUser) {
    const data = new FormData(form)

    let message = data.get("message")
    let result = Manager.sendMessage(contact, currentUser.token, message);
    console.log(result)
}

export {printDiscution, writingMessages, quitMessages}
