import { MacroDoorState } from '../macro'
import Animation from './animation'
import { LeftDoor, RightDoor } from './door'
import House from './house'
import DrawingBg from './drawing-bg'

class DrawingController extends Animation {
    constructor() {
        super()
        this.doorState = MacroDoorState.Normal
        this.stopFlag = false
    }

    update(elapsed) {
        if (this.stopFlag) {
            this.normal()
            this.stopFlag = false
        }

        this.bg.update(elapsed)
        this.leftDoor.update(elapsed)
        this.rightDoor.update(elapsed)
        this.house.update(elapsed)
    }

    draw() {
        this.bg.draw()
        this.leftDoor.draw()
        this.rightDoor.draw()
        this.house.draw()
    }

    active(context) {
        this.bg = new DrawingBg(context)
        this.leftDoor = new LeftDoor(context)
        this.rightDoor = new RightDoor(context)
        this.house = new House(context)

        this.run()
    }

    open() {
        this.doorState = MacroDoorState.Opening
    }

    close() {
        this.doorState = MacroDoorState.Closing
    }

    stop() {
        this.stopFlag = true
    }

    normal() {
        this.doorState = MacroDoorState.Normal
    }
}

export default DrawingController