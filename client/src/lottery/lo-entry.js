import React from 'react'
import { MacroEvent } from './lo-macro'
import LORound from './lo-round'
import LOBet from './lo-bet'
import MMGuide from '../common/mm-guide'
import LOWithdraw from './lo-withdraw'

class LoEntry extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            active: false,
        }
    }

    render() {
        if (!this.state.active) return null
        else if (!projApp.mmCheck.pass())
            return <MMGuide />
        else
            return <div className='lottery lo'>
                <LORound />
                <div className='op'>
                    <LOWithdraw />
                    <LOBet />
                </div>
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