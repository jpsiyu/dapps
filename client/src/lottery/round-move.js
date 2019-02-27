import Animation from '../common/animation'

const MoveState = {
    Idle: 'Idle',
    Move: 'Move',
}

class RoundMove extends Animation {
    constructor() {
        super()
        this.moveSpeed = 1000
        this.state = MoveState.Idle
        this.target
        this.handler = null
        this.checker = null
        this.ending = null
    }

    move(handler, checker, ending) {
        this.handler = handler
        this.checker = checker
        this.ending = ending
        this.state = MoveState.Move
    }

    update(elapsed) {
        switch (this.state) {
            case MoveState.Idle:
                break;
            case MoveState.Move:
                if (!this.checker())
                    this.handler(this.moveSpeed * elapsed)
                else {
                    this.ending()
                    this.state = MoveState.Idle
                }
                break;
        }
    }

    isMoving() {
        return this.state == MoveState.Move
    }
}

export default RoundMove