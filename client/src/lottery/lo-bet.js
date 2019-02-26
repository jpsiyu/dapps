import React from 'react'
import utils from './utils'
import Transaction from '../common/transaction'

class LOBet extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            quantity: 1,
        }
    }

    render() {
        return <div className='bet'>
            <div className='quantity hori'>
                <p>Quantity:</p>
                <p>{this.state.quantity}</p>
            </div>
            <div className='sum hori'>
                <p>Total:</p>
                <p>{utils.decimal(this.state.quantity * projApp.lottery.ticketPrice)} eth</p>
            </div>
            <div className='hori'>
                <button className='quantity-btn' onClick={this.onQuantityBtn.bind(this)}>+</button>
                <button className='bet-btn' onClick={this.onBetBtn.bind(this)}>Bet</button>
            </div>
        </div>
    }

    onBetBtn() {
        let tx
        projApp.lottery.txSend(utils.decimal(this.state.quantity * projApp.lottery.ticketPrice))
            .then(res => {
                tx = new Transaction(res, projApp.metamask.web3)
                console.log('receve tx meta')
            })
            .then(() => {
                return tx.waitTxAccept('transactionHash')
            })
            .then(() => {
                window.location.reload()
            })
            .then(() => {
                console.log('ok')
            })
    }

    onQuantityBtn() {
        this.setState({ quantity: this.state.quantity + 1 })
    }
}

export default LOBet