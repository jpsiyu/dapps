class Timer {
    constructor(cbRun, cbFinish) {
        this.timer = null
        this.cbRun = cbRun
        this.cbFinish = cbFinish
    }

    start() {
        stop()
        this.timer = setInterval(() => {
            if (this.cbFinish())
                this.stop()
            else {
                this.cbRun()
            }
        }, 1000)
    }

    stop() {
        if (this.timer) clearInterval(this.timer)
    }
}

export default Timer