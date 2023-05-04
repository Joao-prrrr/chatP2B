
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

    get sender() {
        return this.#sender;
    }

    get receiver() {
        return this.#receiver;
    }
    
    get message() {
        return this.#message;
    }
}

// let conversation = {to: "Lucas", messages : [
//     {message: "Salut ça va?", author: "Joao"},
//     {message: "Bien et toi?", author: "Lucas"}
// ]}

export {Message};