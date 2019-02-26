import Animation from '../../common/animation'
import { MacroDoorState, MacroMap } from '../macro'

class DrawingBg extends Animation {
    constructor(context) {
        super()
        this.context = context
    }

    update(elapsed) {
        switch (projApp.controller.doorState) {
            case MacroDoorState.Opening:
                this.setDirty()
                break
            case MacroDoorState.Closing:
                this.setDirty()
                break
            default:
                break
        }
    }

    draw() {
        if (!this.isDirty) return
        this.context.clearRect(0, 0, MacroMap.CanvasWidth, MacroMap.CanvasHeight)
        this.isDirty = false
    }
}

export default DrawingBg