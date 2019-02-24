import ProjApp from '../common/proj-app'
import MetaMask from '../common/metamask'
import SimplePonzi from './simple-ponzi'
import EventMgr from '../lib/event-mgr'
import { MacroEvent } from './sp-macro'

class SPApp extends ProjApp {
    constructor(props) {
        super(props)
        this.eventMgr = new EventMgr()
        this.metamask = new MetaMask()
        this.simplePonzi = new SimplePonzi()
        this.mmCheck = null
    }

    run() {
        this.metamask.init()
            .then(check => {
                this.mmCheck = check
            })
            .then(() => {
                if (this.mmCheck.pass()) {
                    this.metamask.setAccountChangeCb(() => {
                        window.location.reload()
                    })
                    this.metamask.checkIfAccountChange()
                    return this.simplePonzi.init(this.metamask.web3.currentProvider)
                }
            })
            .then(() => {
                this.eventMgr.dispatch(MacroEvent.Run)
            })
    }
}

export default SPApp