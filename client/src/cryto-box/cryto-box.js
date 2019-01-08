import contract from 'truffle-contract'
import CrytoBoxArtifact from '../../../truffle/build/contracts/CrytoBox.json'
import { MacroEvent } from './cb-macro'

class CrytoBox {
    constructor() {
        this.instance = null
        this.myGoods = null
        this.boxStatus = []
    }

    /* connect to blockchain */
    init(provider) {
        return new Promise((resolve, reject) => {
            const crytoBox = contract(CrytoBoxArtifact)
            crytoBox.setProvider(provider)
            crytoBox.deployed()
                .then(instance => {
                    this.instance = instance
                })
                .then(() => {
                    return this.reload()
                })
                .then(resolve)
        })
    }

    reload() {
        return new Promise((resolve, reject) => {
            this.getMyGoods()
                .then(res => {
                    this.myGoods = this.parseMyGoodsData(res)
                })
                .then(() => {
                    return this.getStatus()
                })
                .then(s => {
                    this.boxStatus = s
                })
                .then(() => {
                    projApp.eventMgr.dispatch(MacroEvent.ContractReload)
                })
                .then(resolve)
        })
    }

    getMyGoods() {
        return this.instance.getMyGoods({ from: projApp.metamask.account })
    }

    parseMyGoodsData(data) {
        const indexList = data[0]
        const descList = data[1]
        const parsed = []
        for (let i = 0; i < indexList.length; i++) {
            const index = indexList[i].toNumber()
            const desc = projApp.metamask.web3.utils.toUtf8(descList[i])
            if (desc != '') {
                parsed.push({ id: index, desc: desc })
            }
        }
        return parsed
    }

    addGoods(desc) {
        const descEncode = projApp.metamask.web3.utils.fromUtf8(desc)
        return this.instance.addGoods(descEncode, { from: projApp.metamask.account })
    }

    takeOut(id) {
        return this.instance.takeOut(id, { from: projApp.metamask.account })
    }

    getStatus() {
        return this.instance.getStatus({ from: projApp.metamask.account })
    }

    assign(id, account) {
        return this.instance.assign(id, account, { from: projApp.metamask.account })
    }

    /* utils */
    getBoxStatus(id) {
        return this.boxStatus[id]
    }

    isFull() {
        let full = true
        this.boxStatus.forEach(s => {
            if (!s) full = false
        })
        return full
    }
}

export default CrytoBox
