import ProjApp from '../common/proj-app'
import MetaMask from '../common/metamask'
import EventMgr from '../lib/event-mgr'
import { MacroEvent } from './macro'

class CBApp extends ProjApp {
    constructor() {
        super()
        this.metamask = new MetaMask()
        this.eventMgr = new EventMgr()
        this.mmCheck = null
    }

    run() {
        this.metamask.init()
            .then(check => {
                this.mmCheck = check
            })
            .then(() => {
                if (this.mmCheck.pass()) {
                    this.metamask.checkIfAccountChange()
                }
            })
            .then(() => {
                this.eventMgr.dispatch(MacroEvent.Run)
            })
    }
}

export default CBApp
