import { MacroNetworkType } from './macro'
import Web3 from 'web3'
import MMCheck from './mm-check'

class MetaMask {
    constructor() {
        this.web3 = null
        this.account = null
        this.accountTimer = null
        this.accountChangeCb = null
    }

    init() {
        return new Promise((resolve, reject) => {
            const check = new MMCheck
            check.browser = this.isSupportedBrowser()
            check.extension = this.isInstall()
            if (!check.browser || !check.extension) resolve(check)

            this.setWeb3()
            this.isUnlock()
                .then(account => {
                    if (account) {
                        this.account = account
                        check.unlock = true
                    }
                })
                .then(() => {
                    return this.getNetworkId()
                })
                .then(networkId => {
                    if (networkId == MacroNetworkType.Ropsten) {
                        check.network = true
                    }
                })
                .then(() => {
                    resolve(check)
                })
                .catch(err => console.log(err))
        })
    }

    setAccountChangeCb(cb) {
        this.accountChangeCb = cb
    }

    setWeb3() {
        const provider = web3.currentProvider
        this.web3 = new Web3(provider)
    }

    isSupportedBrowser() {
        const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)
        const isFirefox = typeof InstallTrigger !== 'undefined';
        return isChrome || isFirefox
    }

    isInstall() {
        return typeof web3 != 'undefined'
    }

    isUnlock() {
        return new Promise((resolve, reject) => {
            let account = null
            this.web3.eth.getAccounts()
                .then(accounts => {
                    if (accounts.length != 0)
                        account = accounts[0]
                    resolve(account)
                })
                .catch(err => console.log(err))
        })
    }

    getNetworkId() {
        return this.web3.eth.net.getId()
    }

    getBlockNumber() {
        return this.web3.eth.getBlockNumber()
    }

    isEqualAccount(address) {
        return address.toLowerCase() == this.account.toLowerCase()
    }

    checkIfAccountChange() {
        this.accountTimer = setInterval(() => {
            this.web3.eth.getAccounts()
                .then(accounts => {
                    const account = accounts[0]
                    if (account != this.account) {
                        clearInterval(this.accountTimer)
                        if (this.accountChangeCb) this.accountChangeCb()
                    }
                })
        }, 3000)
    }
}

export default MetaMask