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

export {Message};
