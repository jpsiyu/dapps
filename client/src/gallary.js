import React from 'react'
import config from './config'
import { Link } from 'react-router-dom'

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
        return <Link to={this.props.cfg.link}>
            <div className='gallary-item'>
                {
                    this.props.cfg.img
                        ? <img src={this.props.cfg.img} />
                        : <h2>{this.props.cfg.name}</h2>
                }
            </div>
        </Link>
    }
}

export default Gallary