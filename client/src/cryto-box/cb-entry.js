import React from 'react'
import CBBoxStatus from './cb-box-status'
import CBBoxCont from './cb-box-cont'

class CBEntry extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div className='cb-entry'>
            <div className='left'>
                <CBBoxCont />
            </div>
            <div className='right'>
                <CBBoxStatus />
            </div>
        </div>
    }
}

export default CBEntry