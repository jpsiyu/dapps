import React from 'react'
import { Link } from 'react-router-dom'

class Navigator extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const cfg = this.props.cfg
        return <div className='navigator'>
            <div className='part'>
                {cfg ? <Link to='/'> <img src='/static/images/home-icon.png' /> </Link> : null}
            </div>
            <div className='part'>
                <h2>{cfg ? cfg.name : 'Gallary'}</h2>
            </div>
            <div className='part'></div>
        </div>
    }
}

export default Navigator