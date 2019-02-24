class Transaction {
    constructor(txMeta, web3Obj) {
        this.txMeta = txMeta
        this.web3Obj = web3Obj
        this.timer = null
    }

    clearTimer() {
        clearInterval(this.timer)
    }

    waitTxAccept(objectKey = 'tx') {
        return new Promise((resolve, reject) => {
            const check = () => this.web3Obj.eth.getTransactionReceipt(this.txMeta[objectKey], (error, result) => {
                if (error != null) { reject(error) }
                else if (result != null && result.status) {
                    console.log('tx accept')
                    clearTimeout(this.timer)
                    resolve(result)
                }
                else {
                    console.log('tx waits for accept')
                    this.timer = setTimeout(check, 1000)
                }
            })
            this.timer = setTimeout(check, 1000)
        })
    }
}

export default Transaction