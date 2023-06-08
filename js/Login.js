
document.querySelector("#openLogin").addEventListener("click", function(e){
    e.target.style.display = "none";
    document.querySelector("#ZoneContact").style.display = "none";
    document.querySelector("#sectionLogin").style.display = "block";
})




document.querySelector("#sendLogin").addEventListener("click", function(e){
    e.preventDefault()

    ConnectUser(document.querySelector("#username").value, document.querySelector("#password").value)
    
});

async function ConnectUser(username, password){
    const response = await fetch('https://edu.pellaux.net/m294/chat-p2b/signin.php', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "username": username, "password": password })
    })



    if (response.ok) {
        const data = (await response.json()).data

        //const user = new User(data.id, data.username, data.token, data.pos_x, data.pos_y);
        const user = { "id":data.id, "username":data.username, "token":data.token, "pos_x":data.pos_x, "pos_y":data.pos_y }
        localStorage.setItem("user", JSON.stringify(user));
       
        document.querySelector(" #openLogin").style.display = "block";
        document.querySelector("#ZoneContact").style.display = "block";
        document.querySelector("#sectionLogin").style.display = "none";
        

    }
    else{
        alert((await response.json()).error)
    }
}