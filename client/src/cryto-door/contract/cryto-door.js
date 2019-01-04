import contract from 'truffle-contract'
import CrytoDoorArtifact from '../../../../truffle/build/contracts/CrytoDoor.json'
import { MacroEvent } from '../macro'

class CrytoDoor {
    constructor() {
        this.instance = null
        this.keyHolder = null
        this.timeLeft = 0
        this.leftTimer = null
    }

    init(provider) {
        return new Promise((resolve, reject) => {
            const crytoDoor = contract(CrytoDoorArtifact)
            crytoDoor.setProvider(provider)
            crytoDoor.deployed()
                .then(instance => {
                    this.instance = instance
                })
                .then(() => {
                    return this.reload()
                })
                .then(resolve)
                .catch(error => console.log(error))
        })
    }

    reload() {
        return new Promise((resolve, reject) => {
            this.instance.getKeyHolder()
                .then(keyHolder => {
                    this.keyHolder = keyHolder
                })
                .then(() => {
                    return this.instance.getLeft()
                })
                .then(left => {
                    this.timeLeft = left.toNumber()
                    if (this.timeLeft > 0) this.startLeftTimer()
                })
                .then(() => {
                    projApp.eventMgr.dispatch(MacroEvent.ContractReload)
                })
                .then(resolve)
                .catch(error => console.log(error))
        })
    }

    startLeftTimer() {
        if (!this.leftTimer) clearInterval(this.leftTimer)
        this.leftTimer = setInterval(() => {
            if (this.timeLeft <= 0) {
                clearInterval(this.leftTimer)
            } else {
                this.timeLeft -= 1
            }
        }, 1000)
    }

    getKeyHolder() {
        return this.instance.getKeyHolder({ from: projApp.metamask.account })
    }

    purchase(min, eth) {
        const second = min * 60
        const wei = projApp.metamask.web3.utils.toWei(eth.toString(), 'ether')
        return this.instance.purchase(second, { from: projApp.metamask.account, value: wei })
    }

    isHoldTimeFinish() {
        return this.instance.isHoldTimeFinish({ from: projApp.metamask.account })
    }

    getLeft() {
        return this.instance.getLeft({ from: projApp.metamask.account })
    }

    doorControll() {
        return this.instance.doorControll({ from: projApp.metamask.account })
    }

}

export default CrytoDoor
