import React from 'react'
import { MacroEvent } from './lo-macro'
import LORound from './lo-round'
import LOBet from './lo-bet'
import MMGuide from '../common/mm-guide'
import LOWithdraw from './lo-withdraw'
import LOApp from './lo-app'

class LoEntry extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            active: false,
        }
    }

    componentDidMount() {
        window.app.resetProjApp(LOApp)
        window.projApp.run(() => { this.setState({ active: true }) })
    }

    render() {
        if (!this.state.active) return null
        if (!window.projApp.mmCheck.pass())
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
}

export default LoEntry