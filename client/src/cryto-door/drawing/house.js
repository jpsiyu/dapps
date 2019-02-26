import { MacroMap, MacroDoorState } from '../macro'
import Animation from '../../common/animation'

class House extends Animation {
    constructor(context) {
        super()
        this.context = context
        this.isDirty = true
    }

    update(elapsed) {
        switch(projApp.controller.doorState){
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
        if(!this.isDirty) return
        const house = projApp.imageMgr.getImage('cryto-door/house.png')
        this.context.drawImage(house.obj, 0, 0, MacroMap.HouseWidth, MacroMap.HouseHeight)
        this.isDirty = false
    }

}

export default House