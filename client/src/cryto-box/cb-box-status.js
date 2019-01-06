import React from 'react'

class CBBoxStatus extends React.Component {
    constructor(props) {
        super(props)
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
        for (let i = 0; i < 9; i++) {
            const info = {
                id: i,
                lock: Math.random() > 0.5,
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
}

export default CBBoxStatus