class Timer {
    constructor(cbRun, cbCheckFinish, cbFinished) {
        this.timer = null
        this.cbRun = cbRun
        this.cbCheckFinish = cbCheckFinish
        this.cbFinished = cbFinished
    }

    start() {
        stop()
        this.timer = setInterval(() => {
            if (this.cbCheckFinish())
                this.stop()
            else {
                this.cbRun()
            }
        }, 1000)
    }

    stop() {
        if (this.timer) clearInterval(this.timer)
        if (this.cbFinished) this.cbFinished()
    }
}

export default Timer