import React from 'react'
import Utils from '../utils'
import Timer from '../timer'

class OwnerOther extends React.Component {
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
        return <div className='owner-other'>
            <img src='/images/cryto-door/unknown.png'></img>
            <p className='desc'>Key is held by other people!</p>
            <p className='left'>Key will be free after:  {timeStr} minutes</p>
        </div>
    }

    componentDidMount() {
        this.timer.start()
    }

    componentWillUnmount() {
        this.timer.stop()
    }

    receEvent() {
        this.setState({
            timeLeft: projApp.crytoDoor.timeLeft
        })
        this.timer = this.startTimer()
    }
}

export default OwnerOther