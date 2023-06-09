// Script for the SPA
// Author : Lucas Soares
// Date : 4.5.2023 v1
import User from "../modules/User.js"


import { printDiscution, quitMessages, writingMessages } from "./ConversationScript.js";



let userIcon = null;
let contactZone = document.querySelector("#ZoneContact");

const messageZone = document.querySelector("#messageZone")
const leaveButton = document.querySelector("#leave")
const url = window.location.href;
const allUsers = [];
let currentUser = null;
let canMove = true;
let currentContact;
let contacts;
let discutionTimeOut;
let canTouch = true;







function createUser(posX, posY, id, name) {
    const encapsulatingDiv = document.createElement("div")
    encapsulatingDiv.className = "Contacts"
    encapsulatingDiv.style.left = `${posX}px`
    encapsulatingDiv.style.top = `${posY}px`
    encapsulatingDiv.id = id;
    encapsulatingDiv.name = name
    const nameTag = document.createElement("p")
    nameTag.textContent = name
    nameTag.style.marginTop = "55px"
    const user = document.createElement("img")

    user.src = "img/aonfsioa.png"



    encapsulatingDiv.appendChild(user)
    encapsulatingDiv.appendChild(nameTag)

    contactZone.appendChild(encapsulatingDiv)
}




async function drawUsers(){
    contacts = document.querySelectorAll(".Contacts");
    


    const reponse = await fetch("https://edu.pellaux.net/m294/chat-p2b/users.php")
    const users = (await reponse.json()).data;
    

    const temp = JSON.parse(localStorage.getItem("user"))
    currentUser = new User(temp.id, temp.username, temp.token, temp.pos_x, temp.pos_y)

    contacts.forEach(function(e){
        e.remove();
    })
    
    for (let i = 0; i < users.length; i++) {
        if (temp.username !== users[i]["username"]) {
            allUsers.push(new User(users[i]["id"], users[i]["username"], users[i]["pos_x"], users[i]["pos_y"]))
            createUser(users[i]["pos_x"], users[i]["pos_y"], users[i]["id"], users[i]["username"]);
        }

    }
}

function init() {

    drawUsers();

    userIcon = document.getElementById("User");
    userIcon.style.position = "relative";
    userIcon.style.left = "150px";
    userIcon.style.top = "150px";


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
/**
 * Bouge a gauche si il ne depasse pas les bords
 */
function moveLeft() {
    const nextPos = parseInt(userIcon.style.left) - 30;
    if (nextPos >= 0) {
        userIcon.style.left = nextPos + "px";
        sendPosition()
    }

}
/**
 * Bouge en haut si il ne depasse pas les bords
 */
function moveUp() {
    const nextPos = parseInt(userIcon.style.top) - 30;
    if (nextPos >= 0) {
        userIcon.style.top = nextPos + "px";
        sendPosition()
    }

}
/**
 * Bouge a droite si il ne depasse pas les bords
 */
function moveRight() {
    const nextPos = parseInt(userIcon.style.left) + 30;
    if (nextPos + userIcon.clientWidth <= contactZone.clientWidth) {
        userIcon.style.left = nextPos + "px";
        sendPosition()
    }


}
/**
 * Bouge en bas si il ne depasse pas les bords
 */
function moveDown() {
    const nextPos = parseInt(userIcon.style.top) + 30;
    if (nextPos + userIcon.clientHeight <= contactZone.clientHeight) {
        userIcon.style.top = nextPos + "px";
        sendPosition()
    }


}

/**
 * Check si deux elements se touchent
 * @param {HTMLElement} el1 | Premier element a etre verifier
 * @param {HTMLElement} el2 | deuxieme element a etre verifier
 * @returns 
 */
function elementsOverlap(el1, el2) {
    const domRect1 = el1.getBoundingClientRect();
    const domRect2 = el2.getBoundingClientRect();

    return !(
        domRect1.top >= domRect2.bottom ||
        domRect1.right <= domRect2.left ||
        domRect1.bottom <= domRect2.top ||
        domRect1.left >= domRect2.right
    );
}
/**
 * quand un boutton est presser, bouger le perso et check s'ils se touchent
 */
document.addEventListener("keydown", (e) => {
    if (canMove) {
        getKeyAndMove(e)
       
    }

})
/**
 * check sur tout les contacts pour voir si ils se touchent avec l'utilisateur
 */
function checkOverlap() {

    contacts.forEach(function (x) {

        if (elementsOverlap(userIcon, x) && canMove && canTouch) {

            messageZone.style.display = "flex";
            contactZone.style.display = "none";
            document.querySelector("#openLogin").style.display = "none";


            canMove = false;
            canTouch = false;

            currentContact = x;

            discutionTimeOut = setInterval(() => {
                printDiscution(x, currentUser)
            }, 500);
            writingMessages(x, currentUser);
            
        }
        

    })
}

async function sendPosition() {
    await fetch("https://edu.pellaux.net/m294/chat-p2b/move.php", {
        method: "POST",
        
        body: JSON.stringify({
            pos_y: parseInt(userIcon.style.top),
            pos_x: parseInt(userIcon.style.left)
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            'Authorization': `Bearer ${currentUser.token}`
        }
    });
    
}


/**
 * sortir de la zone de message
 */
leaveButton.addEventListener("click", (e) => {
    messageZone.style.display = "none";
    contactZone.style.display = "flex";
    document.querySelector("#openLogin").style.display = "block";

    canMove = true;

    clearTimeout(discutionTimeOut);
    setTimeout(() =>{
        canTouch = true;
    }, 2000)

    clearInterval(discutionTimeOut);
    quitMessages(currentContact, currentUser);

    history.pushState({}, null, url);
})

setInterval(() => {
    drawUsers();
    checkOverlap();
}, 600);

init();

