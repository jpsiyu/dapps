import ProjApp from '../common/proj-app'
import EventMgr from '../lib/event-mgr'
import Lottery from './lottery'
import MetaMask from '../common/metamask'

class LOApp extends ProjApp {
    constructor(props) {
        super(props)
        this.eventMgr = new EventMgr()
        this.metamask = new MetaMask()
        this.lottery = new Lottery()
        this.mmCheck = null
    }

    run(end) {
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
                if(end) end()
            })
    }
}

export default LOApp