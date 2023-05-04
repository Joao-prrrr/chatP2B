// Script for the SPA
// Author : Joao Araribá & Lucas Soares
// Date : 4.5.2023 v1

// Message class
import {Message as MessageManager} from "../modules/messageManager.js";

let user = null;
let contactZone = document.querySelector("#ZoneContact");
function init() {
    user = document.getElementById("User");
    user.style.position = "relative";
    user.style.left = "0px";
    user.style.top = "0px";
}
function getKeyAndMove(e) {
    let key_code = e.which || e.keyCode;
    switch (key_code) {
        case 37: //left arrow key
            moveLeft();
            break;
        case 38: //Up arrow key
            moveUp();
            break;
        case 39: //right arrow key
            moveRight();
            break;
        case 40: //down arrow key
            moveDown();
            break;
    }
}
function moveLeft() {
    const nextPos = parseInt(user.style.left) - 20;
    if (nextPos >= 0) {
        user.style.left = nextPos + "px";
    }

}
function moveUp() {
    const nextPos = parseInt(user.style.top) - 20;
    if (nextPos >= 0) {
        user.style.top = nextPos + "px";
    }

}
function moveRight() {
    const nextPos = parseInt(user.style.left) + 20;
    if (nextPos + user.clientWidth <= contactZone.clientWidth) {
        user.style.left = nextPos + "px";
    }

}
function moveDown() {
    const nextPos = parseInt(user.style.top) + 20;
    if (nextPos + user.clientHeight <= contactZone.clientHeight) {
        user.style.top = nextPos + "px";
    }

}

function elementsOverlap(el1, el2) {
    const domRect1 = el1.getBoundingClientRect();
    const domRect2 = el2.getBoundingClientRect();
  
    return !(
      domRect1.top > domRect2.bottom ||
      domRect1.right < domRect2.left ||
      domRect1.bottom < domRect2.top ||
      domRect1.left > domRect2.right
    );
  }

document.addEventListener("keydown", (e) =>{
    getKeyAndMove(e)

})


init();

// Show conversations

const listMessages = MessageManager.getMessages()

const contactName = document.querySelector("#contactName")
const messageField = document.querySelector("#messageField")


const userName = "Lucas";
// const receiverName = "Lucas"
const path = window.location.path + "/MIguel" 
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
