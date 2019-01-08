import ProjApp from '../common/proj-app'
import MetaMask from '../common/metamask'
import EventMgr from '../lib/event-mgr'
import CrytoBox from './cryto-box'
import { MacroEvent } from './cb-macro'

class CBApp extends ProjApp {
    constructor() {
        super()
        this.metamask = new MetaMask()
        this.eventMgr = new EventMgr()
        this.crytoBox = new CrytoBox()
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
                    return this.crytoBox.init(this.metamask.web3.currentProvider)
                }
            })
            .then(() => {
                this.eventMgr.dispatch(MacroEvent.Run)
            })
    }
}

export default CBApp
