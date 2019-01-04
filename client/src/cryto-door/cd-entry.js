import React from 'react'
import Interaction from './interaction'
import DrawingContainer from './drawing-container'

class CDEntry extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div className='cryto-door'>
            <DrawingContainer />
            <Interaction />
        </div>
    }
}

export default CDEntry