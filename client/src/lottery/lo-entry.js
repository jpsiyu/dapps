import React from 'react'
import { MacroEvent } from './lo-macro'
import LORound from './lo-round'
import LOBet from './lo-bet'

class LoEntry extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            active: false,
        }
    }

    render() {
        if (!this.state.active) return null
        return <div className='lottery lo'>
            <LORound />
            <LOBet />
        </div>
    }

    componentDidMount() {
        projApp.eventMgr.subscribe(MacroEvent.Run, this, this.receRun.bind(this))
    }

    componentWillUnmount() {
        projApp.eventMgr.unsubscribe(MacroEvent.Run, this)
    }

    receRun() {
        this.setState({ active: true })
    }
}

export default LoEntry