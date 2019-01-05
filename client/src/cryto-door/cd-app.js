import ImageMgr from '../lib/image-mgr'
import EventMgr from '../lib/event-mgr'
import { MacroEvent } from './macro'
import DrawingController from './drawing/drawing-controller'
import MetaMask from '../common/metamask'
import CrytoDoor from './contract/cryto-door'
import Utils from './utils'
import ProjApp from '../common/proj-app'

class CDApp extends ProjApp {
    constructor() {
        super()
        this.imageMgr = new ImageMgr()
        const images = this.getDownloadImageList()
        this.imageMgr.setDrawingList(images)

        this.eventMgr = new EventMgr()
        this.controller = new DrawingController()
        this.metamask = new MetaMask()
        this.metamask.setAccountChangeCb(() => {
            Utils.notice('Account change, reload page!', () => { window.location.reload() })
        })
        this.crytoDoor = new CrytoDoor()
        this.mmCheck = null
    }

    getDownloadImageList() {
        const imageForDrawing = [
            'cryto-door/house.png',
            'cryto-door/door-l.png',
            'cryto-door/door-r.png',
        ]
        return imageForDrawing
    }


    run() {
        this.imageMgr.loadImages()
            .then(() => {
                return this.metamask.init()
            })
            .then(check => {
                this.mmCheck = check
            })
            .then(() => {
                if (this.mmCheck.pass()) {
                    this.metamask.checkIfAccountChange()
                    return this.crytoDoor.init(this.metamask.web3.currentProvider)
                }
            })
            .then(() => {
                this.eventMgr.dispatch(MacroEvent.Run)
            })
    }

}

export default CDApp