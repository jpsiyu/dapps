import React from 'react'
import Gallary from './gallary'
import Navigator from './navigator'
import qs from 'query-string'
import config from './config'

class Entry extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div className='entry'>
            <Navigator />
            {this.renderContent()}
        </div>
    }

    renderContent() {
        if (!app.search.target) return <Gallary />

        let Comp = null
        for (let i = 0; i < config.projects.length; i++) {
            const cfg = config.projects[i]
            if (cfg.target == app.search.target) {
                Comp = cfg.comp
                break
            }
        }

        if (Comp) return <Comp />
        else return <Gallary />
    }
}

export default Entry