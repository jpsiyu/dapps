import React from 'react'
import CBBoxStatus from './cb-box-status'
import CBBoxCont from './cb-box-cont'
import { MacroEvent } from './cb-macro'
import CBPopAdd from './pop-up/cb-pop-add'

class CBEntry extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showPopAdd: false,
        }
    }

    componentDidMount() {
        projApp.eventMgr.subscribe(MacroEvent.PopUpAdd, this, this.onRecePopAdd.bind(this))
    }

    componentWillUnmount() {
        projApp.eventMgr.unsubscribe(MacroEvent.PopUpAdd, this)
    }

    render() {
        return <div className='cb-entry'>
            <div className='left'>
                <CBBoxCont />
                {this.state.showPopAdd ? <CBPopAdd /> : null}
            </div>
            <div className='right'>
                <CBBoxStatus />
            </div>
        </div>
    }

    onRecePopAdd(show) {
        this.setState({ showPopAdd: show })
    }
}

export default CBEntry