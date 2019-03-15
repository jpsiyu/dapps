import React from 'react'
import {  MacroMap } from './macro'

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
        this.canvas = this.canvasRef.current
        this.context = this.canvas.getContext('2d')
        projApp.controller.active(this.context)
    }

    componentWillUnmount(){
        projApp.controller.end()
    }
}

export default DrawingContainer