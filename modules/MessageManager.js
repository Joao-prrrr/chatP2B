
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

    static async getMessages(userId) {
        // return [
        //     new Message("Joao", "Lucas", "Salut, cv?", "4-5-23"),
        //     new Message("Miguel", "Lucas", "Salut, cv?2", "4-5-23"),
        //     new Message("Joao", "Lucas", "Salut, cv?3", "4-5-23"),
        //     new Message("Jorge", "Lucas", "Salut, cv?4", "4-5-23"),
        //     new Message("Jorge", "Lucas", "Salut, cv?5", "4-5-23"),
        //     new Message("Joao", "Lucas", "Salut, cv?6", "4-5-23"),
        //     new Message("Lucas", "Miguel", "Salut, cv?7", "4-5-23"),
        //     new Message("Lucas", "Joao", "Salut, cv?8", "4-5-23"),
        //     new Message("Joao", "Louis", "Salut, cv?9", "4-5-23"),
        // ];


    }
}

// let conversation = {to: "Lucas", messages : [
//     {message: "Salut ça va?", author: "Joao"},
//     {message: "Bien et toi?", author: "Lucas"}
// ]}

export {Message};