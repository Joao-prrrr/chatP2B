class User {

    #id
    #username
    #token
    #pos_x
    #pos_y

    constructor(id, username, token = "" ,posX, posY) {
        this.#id = id
        this.#username = username
        this.#token = token
        this.#pos_x = posX
        this.#pos_y = posY
    }

    get id(){
        return this.#id
    }
    get username(){
        return this.#username
    }
    get token(){
        return this.#token
    }
    get pos_x(){
        return this.#pos_x
    }
    get pos_y(){
        return this.#pos_y
    }
}

export default User