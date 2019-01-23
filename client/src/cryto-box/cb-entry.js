import React from 'react'
import CBBoxStatus from './cb-box-status'
import CBBoxCont from './cb-box-cont'
import { MacroEvent } from './cb-macro'
import CBPopMgr from './pop-up/cb-pop-mgr'

class CBEntry extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        projApp.eventMgr.subscribe(MacroEvent.PopUpLoading, this, this.onRecePopLoading.bind(this))
    }

    componentWillUnmount() {
        projApp.eventMgr.unsubscribe(MacroEvent.PopUpLoading, this)
    }

    render() {
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