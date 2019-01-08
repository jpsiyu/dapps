import React from 'react'
import { MacroEvent, MacroPopUp, MacroPopUpLayer } from '../cb-macro'
import CBPopAdd from './cb-pop-add'
import CBPopAssign from './cb-pop-assign'
import CBPopLoading from './cb-pop-loading'

const config = [
    { id: 1, layer: MacroPopUpLayer.Normal, name: MacroPopUp.Add, comp: CBPopAdd },
    { id: 2, layer: MacroPopUpLayer.Normal, name: MacroPopUp.Assign, comp: CBPopAssign },
    { id: 3, layer: MacroPopUpLayer.High, name: MacroPopUp.Loading, comp: CBPopLoading },
]

class CBPopMgr extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            normalCfg: null,
            normalCurrent: null,
            highCfg: null,
            highCurrent: null,
        }
    }

    render() {
        return <div className='cb-pop-mgr'>
            {this.renderNormal()}
            {this.renderHigh()}
        </div>
    }

    renderNormal() {
        return this.state.normalCurrent
            ? <div className='cb-pop-mask'>
                {this.state.normalCurrent}
            </div>
            : null
    }

    renderHigh() {
        return this.state.highCurrent
            ? <div className='cb-pop-mask'>
                {this.state.highCurrent}
            </div>
            : null
    }

    componentDidMount() {
        projApp.eventMgr.subscribe(MacroEvent.PopUp, this, this.onRecePopUp.bind(this))
    }

    componentWillUnmount() {
        projApp.eventMgr.unsubscribe(MacroEvent.PopUp, this)
    }

    onRecePopUp(args) {
        if (args.show)
            this.show(args.name)
        else
            this.hide(args.name)
    }

    show(pageName) {
        let cfg = null
        for (let i = 0; i < config.length; i++) {
            if (config[i].name == pageName) {
                cfg = config[i]
                break
            }
        }

        if (!cfg) return
        const Comp = cfg.comp

        switch (cfg.layer) {
            case (MacroPopUpLayer.Normal):
                this.setState({
                    normalCfg: cfg,
                    normalCurrent: <Comp />,
                })
                break
            case (MacroPopUpLayer.High):
                this.setState({
                    highCfg: cfg,
                    highCurrent: <Comp />,
                })
        }
    }

    hide(pageName) {
        if (this.state.normalCfg && this.state.normalCfg.name == pageName) {
            this.setState({
                normalCfg: null,
                normalCurrent: null,
            })
        } else if (this.state.highCfg && this.state.highCfg.name == pageName) {
            this.setState({
                highCfg: null,
                highCurrent: null,
            })
        }
    }
}

export default CBPopMgr