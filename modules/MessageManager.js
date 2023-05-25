
class Manager {

    
    static optionsGet = {
        method: "GET",
        headers: null,
        // mode: "cors",
        // cache: "default"
    };

    static optionsPost = {
        method: "POST",
        headers: null,
        body: null
        // cache: "default"
    };

    static async getMessages(userToken, contactId) {
        return new Promise((resolve, reject) => {

            // userToken = "d5a2f3fa-a589-45ef-9132-2ecb23cbd93d"
            
            Manager.optionsGet.headers = new Headers({'Authorization': `Bearer ${userToken}`})
            // console.log(this.optionsGet)
            const promise = fetch(`https://edu.pellaux.net/m294/chat-p2b/messages.php?contact=${contactId}`, this.optionsGet)

            promise.then(response => {
                console.log(response)
                if(response.ok) {
                    return response.json();
                }
                else {
                    reject(response.status);
                }
            }).then(json => {   
                resolve(json);
            })

        })
    }

    static async sendMessage(contact, userToken, message) {
        Manager.optionsPost.headers = new Headers({'Authorization': `Bearer ${userToken}`})
        Manager.optionsPost.body = {
            "contact": contact.id,
            "message": message
        };
        const promise = fetch(`https://edu.pellaux.net/m294/chat-p2b/messages.php`, this.optionsPost)

    }
}

// let conversation = {to: "Lucas", messages : [
//     {message: "Salut ça va?", author: "Joao"},
//     {message: "Bien et toi?", author: "Lucas"}
// ]}

export {Manager};