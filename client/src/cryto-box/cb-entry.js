import React from 'react'
import CBBoxStatus from './cb-box-status'
import CBBoxCont from './cb-box-cont'
import { MacroEvent } from './cb-macro'
import CBPopMgr from './pop-up/cb-pop-mgr'
import CBAPP from './cb-app'

class CBEntry extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            active: false
        }
    }

    componentDidMount() {
        window.app.resetProjApp(CBAPP)
        window.projApp.eventMgr.subscribe(MacroEvent.PopUpLoading, this, this.onRecePopLoading.bind(this))
        window.projApp.run(() => { this.setState({ active: true }) })
    }

    componentWillUnmount() {
        projApp.eventMgr.unsubscribe(MacroEvent.PopUpLoading, this)
    }

    render() {
        if (!this.state.active) return null
        return <div className='cb-entry'>
            <div className='cont'>
                <CBBoxCont />
                <CBPopMgr />
            </div>
            <div className='draw'>
                <CBBoxStatus />
            </div>
        </div>
    }

    onRecePopLoading(show) {
        this.setState({ showLoading: show })
    }
}

export default CBEntry