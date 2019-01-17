class Animation {
    constructor() {
        this.isDirty = false
        this.finish = false
        this.frame = this.frame.bind(this)
    }

    run() {
        window.requestAnimationFrame(this.frame)
    }

    frame(timestamp) {
        if (this.finish) return
        this.previous = this.previous || timestamp
        const elapsed = (timestamp - this.previous) / 1000
        this.previous = timestamp
        this.update(elapsed)
        this.draw()
        window.requestAnimationFrame(this.frame)
    }

    update(elapsed) { }

    draw() { }

    setDirty() {
        this.isDirty = true
    }

    end() {
        this.finish = true
    }

}

export default Animation