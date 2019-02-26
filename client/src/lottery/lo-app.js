import ProjApp from '../common/proj-app'
import MetaMask from '../common/metamask'
import EventMgr from '../lib/event-mgr'
import Lottery from './lottery'
import { MacroEvent } from './lo-macro'

class LOApp extends ProjApp {
    constructor(props) {
        super(props)
        this.eventMgr = new EventMgr()
        this.metamask = new MetaMask()
        this.lottery = new Lottery()
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
                    return this.lottery.init(this.metamask.web3.currentProvider)
                }
            })
            .then(() => {
                this.eventMgr.dispatch(MacroEvent.Run)
            })
    }
}

export default LOApp