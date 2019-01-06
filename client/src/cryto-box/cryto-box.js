import contract from 'truffle-contract'
import CrytoBoxArtifact from '../../../truffle/build/contracts/CrytoBox.json'

class CrytoBox {
    constructor() {
        this.instance = null
        this.myGoods = null
    }

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
}

export default CrytoBox
