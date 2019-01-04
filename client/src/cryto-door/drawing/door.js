import { MacroMap, MacroDoorState, MacroEvent } from '../macro'
import Animation from './animation'

class Door extends Animation {
    constructor(context) {
        super()
        this.context = context
        this.image = this.getImage()

        this.speed = 100
        this.pos = this.getOriginPos()
        this.isDirty = true

    }

    draw() {
        if (!this.isDirty) return
        const image = this.getImage()
        this.context.drawImage(image.obj, this.pos.x, this.pos.y, MacroMap.DoorWidth, MacroMap.DoorHeight)
        this.isDirty = false
    }

    getOriginPos() {
        return { x: 0, y: 0 }
    }

    getOpenPos() {
        return { x: 0, y: 0 }
    }

    getImage() {
        const image = projApp.imageMgr.getImage('cryto-door/door-l.png')
        return image
    }

}

class LeftDoor extends Door {
    constructor(context) {
        super(context)
    }

    update(elapsed) {
        let move
        let openPos
        let closePos
        switch (projApp.controller.doorState) {
            case MacroDoorState.Opening:
                openPos = this.getOpenPos()
                move = this.speed * elapsed
                this.pos.x -= move
                if (this.pos.x <= openPos.x) {
                    this.pos.x = openPos.x
                    projApp.controller.stop()
                }
                this.setDirty()
                break
            case MacroDoorState.Closing:
                closePos = this.getOriginPos()
                move = this.speed * elapsed
                this.pos.x += move
                if(this.pos.x >= closePos.x){
                    this.pos.x = closePos.x
                    projApp.controller.stop()
                }
                this.setDirty()
                break
            default:
                break
        }
    }

    getOriginPos() {
        return { x: 100, y: 175 }
    }

    getOpenPos() {
        return { x: 0, y: 175 }
    }

    getImage() {
        const image = projApp.imageMgr.getImage('cryto-door/door-l.png')
        return image
    }

}

class RightDoor extends Door {
    constructor(context) {
        super(context)
    }

    update(elapsed) {
        let move
        let openPos
        let closePos
        switch (projApp.controller.doorState) {
            case MacroDoorState.Opening:
                openPos = this.getOpenPos()
                move = this.speed * elapsed
                this.pos.x += move
                if (this.pos.x >= openPos.x) {
                    this.pos.x = openPos.x
                }
                this.setDirty()
                break
            case MacroDoorState.Closing:
                closePos = this.getOriginPos() 
                move = this.speed * elapsed
                this.pos.x -= move
                if(this.pos.x <= closePos.x){
                    this.pos.x = closePos.x
                }
                this.setDirty()
                break
            default:
                break
        }
    }

    getOriginPos() {
        return { x: 185, y: 175 }
    }

    getOpenPos() {
        return { x: 285, y: 175 }
    }

    getImage() {
        const image = projApp.imageMgr.getImage('cryto-door/door-r.png')
        return image
    }

}

export { LeftDoor, RightDoor }