// Script for the SPA
// Author : Lucas Soares
// Date : 4.5.2023 v1
import User from "../modules/User.js"


import { printDiscution } from "./ConversationScript.js";



let userIcon = null;
let contactZone = document.querySelector("#ZoneContact");

const messageZone = document.querySelector("#messageZone")
const leaveButton = document.querySelector("#leave")
const url = window.location.href;
const allUsers = [];
let currentUser;





const reponse = await fetch("https://edu.pellaux.net/m294/chat-p2b/users.php")
const users = (await reponse.json()).data;


for (let i = 0; i < users.length; i++) {
   allUsers.push(new User(users[i]["id"], users[i]["username"], users[i]["pos_x"], users[i]["pos_y"]))
   createUser( users[i]["pos_x"], users[i]["pos_y"], users[i]["username"] )

   
}

function createUser(posX, posY, username){
    let user = document.createElement("img")
    user.className = "Contacts"
    user.src = "img/aonfsioa.png"
    user.style.left = `${posX}px`
    user.style.top = `${posY}px`
    user.id = username;
    contactZone.appendChild(user)
}

const allContacts = document.querySelectorAll(".Contacts");

function init() {
    userIcon = document.getElementById("User");
    userIcon.style.position = "relative";
    userIcon.style.left = "150px";
    userIcon.style.top = "150px";
    const temp = JSON.parse(localStorage.getItem("user"))
    currentUser = new User(temp.id, temp.username, temp.token, temp.pos_x, temp.pos_y)

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
    const nextPos = parseInt(userIcon.style.left) - 40;
    if (nextPos >= 0) {
        userIcon.style.left = nextPos + "px";

    }

}
/**
 * Bouge en haut si il ne depasse pas les bords
 */
function moveUp() {
    const nextPos = parseInt(userIcon.style.top) - 40;
    if (nextPos >= 0) {
        userIcon.style.top = nextPos + "px";

    }

}
/**
 * Bouge a droite si il ne depasse pas les bords
 */
function moveRight() {
    const nextPos = parseInt(userIcon.style.left) + 40;
    if (nextPos + userIcon.clientWidth <= contactZone.clientWidth) {
        userIcon.style.left = nextPos + "px";

    }


}
/**
 * Bouge en bas si il ne depasse pas les bords
 */
function moveDown() {
    const nextPos = parseInt(userIcon.style.top) + 40;
    if (nextPos + userIcon.clientHeight <= contactZone.clientHeight) {
        userIcon.style.top = nextPos + "px";

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
      domRect1.top > domRect2.bottom ||
      domRect1.right < domRect2.left ||
      domRect1.bottom < domRect2.top ||
      domRect1.left > domRect2.right
    );
}
/**
 * quand un boutton est presser, bouger le perso et check s'ils se touchent
 */
document.addEventListener("keydown", (e) =>{
    getKeyAndMove(e)
    checkOverlap();
})
/**
 * check sur tout les contacts pour voir si ils se touchent avec l'utilisateur
 */
function checkOverlap(){
    allContacts.forEach( function (x) {
        if(elementsOverlap(userIcon,x)){
            console.log(localStorage.getItem("user"))
            messageZone.style.display = "flex";
            contactZone.style.display = "none";
            userIcon.style.left = "0px";
            userIcon.style.top = "0px";

            
            printDiscution(x)
            // history.pushState({}, null, `${url}/Joao`);


        }
        
    })
}
/**
 * sortir de la zone de message
 */
leaveButton.addEventListener("click", (e) =>{
    messageZone.style.display = "none";
    contactZone.style.display = "flex";
    userIcon.style.left = "500px";
    userIcon.style.top = "500px";
    history.pushState({}, null, url);
})


init();

