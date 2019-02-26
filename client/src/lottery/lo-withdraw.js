import React from 'react'
import utils from './utils'

class LOWithdraw extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div className='withdraw'>
            <p className='w-desc'>Your balance: {utils.decimal(projApp.lottery.myBalance)} eth</p>
            <button className='w-btn' onClick={this.onBtnWithdraw.bind(this)}>Withdraw</button>
        </div>
    }

    onBtnWithdraw() {
        let tx
        projApp.lottery.txWithdraw()
            .then(res => {
                tx = new Transaction(res, projApp.metamask.web3)
                console.log('receve tx meta')
            })
            .then(() => {
                return tx.waitTxAccept()
            })
            .then(() => {
                window.location.reload()
            })
            .then(() => {
                console.log('ok')
            })

    }
}

export default LOWithdraw