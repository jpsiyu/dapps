import contract from 'truffle-contract'
import SimplePonziArtifact from '../../../truffle/build/contracts/SimplePonzi.json'

class SimplePonzi {
    constructor() {
        this.instance = null
        this.minimum = 0
        this.balance = 0
    }

    init(provider) {
        return new Promise((resolve, reject) => {
            const simplePonzi = contract(SimplePonziArtifact)
            simplePonzi.setProvider(provider)
            simplePonzi.deployed()
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
            this.txGetMinimumInvestment()
                .then(investment => {
                    const wei = investment.toString()
                    const eth = projApp.metamask.web3.utils.fromWei(wei, 'ether')
                    this.minimum = eth
                })
                .then(() => {
                    return this.txGetBalance()
                })
                .then(b => {
                    const wei = b.toString()
                    const eth = projApp.metamask.web3.utils.fromWei(wei, 'ether')
                    this.balance = eth
                })
                .then(resolve)
        })
    }

    txSend(eth) {
        const wei = projApp.metamask.web3.utils.toWei(eth.toString(), 'ether')
        return projApp.metamask.web3.eth.sendTransaction({ from: projApp.metamask.account, to: this.instance.address, value: wei })
    }

    txWithdraw() {
        return this.instance.withdraw({ from: projApp.metamask.account })
    }

    txGetMinimumInvestment() {
        return this.instance.getMinimumInvestment({ from: projApp.metamask.account })
    }

    nextInvestValue() {
        return this.minimum
    }

    txGetBalance() {
        return this.instance.getBalance({ from: projApp.metamask.account })
    }

    getBalance(){
        return Math.floor(this.balance * 100) / 100
    }
}

export default SimplePonzi
