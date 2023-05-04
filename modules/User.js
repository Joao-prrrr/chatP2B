class User {

    #_id
    #username
    #pos_x
    #pos_y

    constructor(id, username, posX, posY) {
        this.#_id = id
        this.#username = username
        this.#pos_x = posX
        this.#pos_y = posY
    }
}

export {User}