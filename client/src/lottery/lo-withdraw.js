import React from 'react'
import utils from './utils'

class LOWithdraw extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const b = utils.decimal(projApp.lottery.myBalance)
        return <div className='withdraw'>
            <p className='w-desc'>Your balance: {b} eth</p>
            {b > 0
                ? <button className='w-btn' onClick={this.onBtnWithdraw.bind(this)}>Withdraw</button>
                : null
            }
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