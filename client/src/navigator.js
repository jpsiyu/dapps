import React from 'react'

class Navigator extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        if (!app.search.target) return this.renderGallary()
        if (!app.projectCfg) return this.renderGallary()
        return this.renderProject(app.projectCfg)
    }

    renderGallary() {
        return <div className='navigator'>
            <h2>Gallary</h2>
        </div>
    }

    renderProject(cfg) {
        return <div className='navigator'>
            <h2>{cfg.name}</h2>
        </div>

    }
}

export default Navigator