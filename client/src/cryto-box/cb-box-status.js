import React from 'react'
import { MacroEvent, MacroBox } from './cb-macro'

class CBBoxStatus extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        projApp.eventMgr.subscribe(MacroEvent.ContractReload, this, this.onReceReload.bind(this))
    }

    componentWillMount() {
        projApp.eventMgr.unsubscribe(MacroEvent.ContractReload, this)
    }

    render() {
        return <div className='cb-box-ui'>
            <div className='title'>
                <h2>Box Status</h2>
            </div>
            <div className='boxes'>
                {this.renderBoxes()}
            </div>
        </div>
    }

    renderBoxes() {
        const boxList = []
        for (let i = 0; i < MacroBox.Total; i++) {
            const s = projApp.crytoBox.getBoxStatus(i)
            const info = {
                id: i,
                lock: s,
            }
            boxList.push(this.renderBox(info))
        }
        return boxList
    }

    renderBox(info) {
        return <div className='box' key={info.id}>
            <div className='label'>
                <p>{info.id}</p>
            </div>
            <div className='status'>
                {info.lock
                    ? <img src='/images/cryto-box/lock.png' />
                    : null
                }
            </div>
        </div>
    }

    onReceReload() {
        this.forceUpdate()
    }
}

export default CBBoxStatus