class MMCheck {
    constructor() {
        this.browser = false
        this.extension = false
        this.unlock = false
        this.network = false
    }

    pass() {
        return this.browser
            && this.extension
            && this.unlock
            && this.network
    }
}

export default MMCheck