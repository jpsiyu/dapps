import ProjApp from '../common/proj-app'
import SimplePonzi from './simple-ponzi'
import EventMgr from '../lib/event-mgr'
import MetaMask from '../common/metamask'

class SPApp extends ProjApp {
    constructor(props) {
        super(props)
        this.eventMgr = new EventMgr()
        this.metamask = new MetaMask()
        this.simplePonzi = new SimplePonzi()
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
                    return this.simplePonzi.init(this.metamask.web3.currentProvider)
                }
            })
            .then(() => {
                if(end) end()
            })
    }
}

export default SPApp