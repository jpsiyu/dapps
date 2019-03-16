import React from 'react'
import MMGuide from '../common/mm-guide'
import Transaction from '../common/transaction'
import SPAPP from './sp-app'

class SPEntry extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            active: false,
        }
    }

    componentDidMount() {
        window.app.resetProjApp(SPAPP)
        window.projApp.run(() => { this.setState({ active: true }) })
    }

    render() {
        if (!this.state.active)
            return null
        else if (!projApp.mmCheck.pass())
            return <MMGuide />
        else
            return this.renderPonzi()
    }

    renderPonzi() {
        return <div className='sp-entry sp'>
            <div className='desc'>
                <h3 className='d-title'>Good Investment Found</h3>
                <p className='d-detail'>Dear Mr/Mrs, there is a good investment here, it's time to be rich.</p>
                <p className='d-detail'>We can sure that, give us some time, and more than 10% return will be done.</p>
                <img src='/static/images/simple-ponzi/gold.png' />
            </div>
            <div className='op'>
                <img src='/static/images/simple-ponzi/flower.png' />
                <p className='o-price'>Invest ether: <span>{projApp.simplePonzi.nextInvestValue()}</span> eth</p>
                <button className='o-btn' onClick={this.onSend.bind(this)}>Invest</button>
                <div className='balance'>
                    <p>Your balance: {projApp.simplePonzi.getBalance()} eth</p>
                    {projApp.simplePonzi.balance > 0
                        ? <button className='b-btn' onClick={this.onWithdraw.bind(this)}>Withdraw</button>
                        : null}
                </div>
            </div>
        </div>
    }

    onWithdraw() {
        let tx
        projApp.simplePonzi.txWithdraw()
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

    onSend() {
        let tx
        projApp.simplePonzi.txSend(projApp.simplePonzi.nextInvestValue())
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

    receRun() {
        this.setState({ active: true })
    }
}

export default SPEntry