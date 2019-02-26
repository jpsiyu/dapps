import contract from 'truffle-contract'
import LotteryArtifact from '../../../truffle/build/contracts/Lottery.json'
import { MacroSymbol } from './lo-macro'

class Lottery {
    constructor() {
        this.instance = null
        this.ticketPrice = 0
        this.round = 0
        this.allAound = {}
    }

    init(provider) {
        return new Promise((resolve, reject) => {
            const lottery = contract(LotteryArtifact)
            lottery.setProvider(provider)
            lottery.deployed()
                .then(instance => {
                    this.instance = instance
                })
                .then(() => {
                    return this.txGetTicketPrice()
                })
                .then(tp => {
                    const wei = tp.toString()
                    const eth = projApp.metamask.web3.utils.fromWei(wei, 'ether')
                    this.ticketPrice = eth
                })
                .then(() => {
                    return this.txGetAllRoundInfo()
                })
                .then(res => {
                    this.round = res[0].toNumber()
                    const quantityArray = res[1]
                    const winnerArray = res[2]
                    const diffArray = res[3]
                    const info = {}
                    for (let i = 0; i < quantityArray.length; i++) {
                        const q = quantityArray[i].toNumber()
                        const w = winnerArray[i] == 0 ? MacroSymbol.No : winnerArray[i].toString()
                        const d = diffArray[i].toNumber()
                        info[i + 1] = { quantity: q, winner: w, diff: d }
                    }
                    this.allAound = info
                })
                .then(resolve)
        })
    }

    /** transactions */
    txSend(eth) {
        const wei = projApp.metamask.web3.utils.toWei(eth.toString(), 'ether')
        return projApp.metamask.web3.eth.sendTransaction({ from: projApp.metamask.account, to: this.instance.address, value: wei })
    }

    txDrawWinner(roundNumber) {
        return this.instance.drawWinner(roundNumber, { from: projApp.metamask.account })
    }

    txWithdraw() {
        return this.instance.withdraw({ from: projApp.metamask.account })
    }

    txGetTicketPrice() {
        return this.instance.getTicketPrice({ from: projApp.metamask.account })
    }

    txGetRound() {
        return this.instance.getRound({ from: projApp.metamask.account })
    }

    txGetRoundInfo(round) {
        return this.instance.getRoundInfo(round, { from: projApp.metamask.account })
    }

    txGetAllRoundInfo() {
        return this.instance.getAllRoundInfo({ from: projApp.metamask.account })
    }

    /** logic */
    getRoundById(id) {
        return this.allAound[id]
    }
}

export default Lottery