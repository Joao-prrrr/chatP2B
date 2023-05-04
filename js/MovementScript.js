// Script for the SPA
// Author : Lucas Soares
// Date : 4.5.2023 v1

let user = null;
let contactZone = document.querySelector("#ZoneContact");
const allContacts = document.querySelectorAll(".Contacts");
const messageZone = document.querySelector("#messageZone")
const leaveButton = document.querySelector("#leave")
const url = window.location.href;

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
/**
 * Bouge a gauche si il ne depasse pas les bords
 */
function moveLeft() {
    const nextPos = parseInt(user.style.left) - 40;
    if (nextPos >= 0) {
        user.style.left = nextPos + "px";

    }

}
/**
 * Bouge en haut si il ne depasse pas les bords
 */
function moveUp() {
    const nextPos = parseInt(user.style.top) - 40;
    if (nextPos >= 0) {
        user.style.top = nextPos + "px";

    }

}
/**
 * Bouge a droite si il ne depasse pas les bords
 */
function moveRight() {
    const nextPos = parseInt(user.style.left) + 40;
    if (nextPos + user.clientWidth <= contactZone.clientWidth) {
        user.style.left = nextPos + "px";

    }


}
/**
 * Bouge en bas si il ne depasse pas les bords
 */
function moveDown() {
    const nextPos = parseInt(user.style.top) + 40;
    if (nextPos + user.clientHeight <= contactZone.clientHeight) {
        user.style.top = nextPos + "px";

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
        if(elementsOverlap(user,x)){

            messageZone.style.display = "flex";
            contactZone.style.display = "none";
            user.style.left = "0px";
            user.style.top = "0px";
            
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
    history.pushState({}, null, url);
})

init();
