import React from 'react'
import CBBoxStatus from './cb-box-status'
import CBBoxCont from './cb-box-cont'
import { MacroEvent } from './cb-macro'
import CBPopAdd from './pop-up/cb-pop-add'
import CBPopLoading from './pop-up/cb-pop-loading'

class CBEntry extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showPopAdd: false,
            showLoading: false,
        }
    }

    componentDidMount() {
        projApp.eventMgr.subscribe(MacroEvent.PopUpAdd, this, this.onRecePopAdd.bind(this))
        projApp.eventMgr.subscribe(MacroEvent.PopUpLoading, this, this.onRecePopLoading.bind(this))
    }

    componentWillUnmount() {
        projApp.eventMgr.unsubscribe(MacroEvent.PopUpAdd, this)
        projApp.eventMgr.unsubscribe(MacroEvent.PopUpLoading, this)
    }

    render() {
        return <div className='cb-entry'>
            <div className='left'>
                <CBBoxCont />
                {this.state.showPopAdd ? <CBPopAdd /> : null}
                {this.state.showLoading ? <CBPopLoading /> : null}
            </div>
            <div className='right'>
                <CBBoxStatus />
            </div>
        </div>
    }

    onRecePopAdd(show) {
        this.setState({ showPopAdd: show })
    }

    onRecePopLoading(show) {
        this.setState({ showLoading: show })
    }
}

export default CBEntry