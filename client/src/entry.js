import React from 'react'
import Gallary from './gallary'
import Navigator from './navigator'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import config from './config'

class Entry extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <BrowserRouter>
            <Switch>
                <Route path='/' exact component={this.renderGallary.bind(this)} />
                {this.renderProjects()}
                <Route component={this.renderMiss.bind(this)} />
            </Switch>
        </BrowserRouter>
    }

    renderProjects() {
        const items = []
        config.projects.forEach(cfg => {
            if (cfg.comp) {
                items.push(<Route key={cfg.id} path={cfg.link} component={() => this.renderProj(cfg)} />)
            }
        })
        return items
    }

    renderGallary() {
        return <EntryWrap>
            <Navigator />
            <Gallary />
        </EntryWrap>
    }

    renderProj(cfg) {
        app.resetProjApp(cfg)
        const Comp = cfg.comp
        return <EntryWrap>
            <Navigator cfg={cfg} />
            <Comp />
        </EntryWrap>
    }

    renderMiss() {
        return <EntryWrap>
            <p>Missing the road...</p>
        </EntryWrap>
    }
}

class EntryWrap extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div className='entry'>
            {this.props.children}
        </div>
    }
}

export default Entry