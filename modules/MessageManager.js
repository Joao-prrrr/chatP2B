
class Message {
    #id
    #sender
    #receiver
    #message
    #date
    
    constructor(sender, receiver, message, date) {
        this.#sender = sender
        this.#receiver = receiver
        this.#message = message
        this.#date = date
    }
}

let conversation = {to: "Lucas", messages : [
    {message: "Salut ça va?", author: "Joao"},
    {message: "Bien et toi?", author: "Lucas"}
]}

export {conversation}