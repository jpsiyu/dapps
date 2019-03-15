import React from 'react'
import Interaction from './interaction'
import DrawingContainer from './drawing-container'
import CDAPP from './cd-app'

class CDEntry extends React.Component {
    constructor(props) {
        super(props)
        this.state = { active: false }
    }

    componentDidMount() {
        window.app.resetProjApp(CDAPP)
        window.projApp.run(() => {
            this.setState({ active: true })
        })
    }

    render() {
        if (!this.state.active) return null
        return <div className='cryto-door'>
            <DrawingContainer />
            <Interaction />
        </div>
    }
}

export default CDEntry