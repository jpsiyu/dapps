import React from 'react'
import { MacroEvent, MacroMap } from './macro'

class DrawingContainer extends React.Component {
    constructor(props) {
        super(props)
        this.canvasRef = React.createRef()
        this.canvas = null
        this.context = null
        this.leftDoor = null
        this.rightDoor = null
        this.bg = null
    }

    render() {
        return <div className='draw-container'>
            <div className='canvas-container'>
                <canvas
                    className='canvas'
                    ref={this.canvasRef}
                    width={MacroMap.CanvasWidth}
                    height={MacroMap.CanvasHeight}
                />
            </div>
        </div>
    }

    componentDidMount() {
        projApp.eventMgr.subscribe(MacroEvent.Run, this, this.activeController.bind(this))

        this.canvas = this.canvasRef.current
        this.context = this.canvas.getContext('2d')
        
    }

    componentWillUnmount(){
        projApp.controller.end()
    }

    activeController() {
        projApp.controller.active(this.context)
    }

}

export default DrawingContainer