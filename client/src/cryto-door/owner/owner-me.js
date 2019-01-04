import React from 'react'
import Utils from '../utils'
import Timer from '../timer'

class OwnerMe extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            timeLeft: projApp.crytoDoor.timeLeft,
        }

        this.timer = new Timer(
            () => { this.setState({ timeLeft: this.state.timeLeft - 1 }) },
            () => { return this.state.timeLeft <= 0 }
        )
    }

    render() {
        const timeStr = Utils.timeFormat(this.state.timeLeft)
        return <div className='owner-me'>
            <div className='owner-top'>
                <div className='owner-top-left'>
                    <p className='left-desc'>Hello, key holder!</p>
                    <img src='/images/cryto-door/owner-me.png'></img>
                </div>
                <div className='owner-top-right'>
                    <div className='right-desc'><p>The key will be free after:</p></div>
                    <div className='right-time'><p>{timeStr}</p></div>
                </div>
            </div>
            <div className='owner-op'>
                <div className='op-desc'>You can controll the door:</div>
                <div className='op-btn'>
                    <button className='owner-btn btn' onClick={this.onOpenClick.bind(this)}>open</button>
                    <button className='owner-btn btn' onClick={this.onCloseClick.bind(this)}>close</button>
                </div>
            </div>
        </div>
    }

    componentDidMount() {
        this.timer.start()
    }

    componentWillUnmount() {
        this.timer.stop()
    }

    onOpenClick() {
        projApp.crytoDoor.doorControll()
            .then(res => {
                if (res)
                    projApp.controller.open()
                else
                    Utils.notice('Key Access Denied')
            })
    }

    onCloseClick() {
        projApp.crytoDoor.doorControll()
            .then(res => {
                if (res)
                    projApp.controller.close()
                else
                    Utils.notice('Key Access Denied')
            })
    }
}

export default OwnerMe