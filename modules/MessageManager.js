
class Manager {

    
    static options = {
        method: "GET",
        headers: null,
        // mode: "no-cors",
        //cache: "default"
    };

    static async getMessages(userToken, contact) {
        return new Promise((resolve, reject) => {

            userToken = "d5a2f3fa-a589-45ef-9132-2ecb23cbd93d"
            
            Manager.options.headers = new Headers({Authentication: `Bearer ${userToken}`})
            // console.log(this.options)
            const promise = fetch(`https://edu.pellaux.net/m294/chat-p2b/messages.php?contact=${contact}`, Manager.options)

            promise.then(response => {
                console.log(response)
                if(response.ok) {
                    return response.json();
                }else {
                    reject(response.status);
                }
            })
            .then(json => {   
                resolve(json);
            })

        })
    }
}

// let conversation = {to: "Lucas", messages : [
//     {message: "Salut ça va?", author: "Joao"},
//     {message: "Bien et toi?", author: "Lucas"}
// ]}

export {Manager};