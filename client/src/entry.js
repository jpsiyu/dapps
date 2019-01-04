import React from 'react'
import Gallary from './gallary'
import Navigator from './navigator'

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
        if (!app.projCfg) return <Gallary />
        
        const Comp = app.projCfg.comp
        return <Comp />
    }
}

export default Entry