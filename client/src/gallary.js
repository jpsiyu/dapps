import React from 'react'
import config from './config'
import qs from 'query-string'

class Gallary extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const items = []
        config.projects.forEach(cfg => {
            items.push(<GallaryItem key={cfg.id} cfg={cfg} />)
        })
        return <div className='gallary'>
            {items}
        </div>
    }
}

class GallaryItem extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div className='gallary-item' onClick={this.onClick.bind(this)}>
            {
                this.props.cfg.img
                    ? <img src='/images/proj-cryto-door.png' />
                    : <h2>{this.props.cfg.name}</h2>
            }
        </div>
    }

    onClick() {
        if (!this.props.cfg.target) return
        const qsRes = qs.stringify({ target: this.props.cfg.target })
        location.search = qsRes
    }
}

export default Gallary