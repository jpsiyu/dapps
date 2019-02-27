import React from 'react'
import Transaction from '../common/transaction'
import { MacroSymbol } from './lo-macro'
import RoundMove from './round-move'

class LORound extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentOrder: 1,
            position: 0,
        }
        this.step = 400;
        this.roundMove = new RoundMove()
        this.roundMove.run()
    }

    render() {
        return <div className='round'>
            <div className='mask'>
                <RoundScroll position={this.state.position} />
                {this.hasLeft()
                    ? <div className='ear ear-l' onClick={this.left.bind(this)}>
                        <p className='noselect'>{'<'}</p>
                    </div>
                    : null
                }
                {this.hasRight()
                    ? <div className='ear ear-r' onClick={this.right.bind(this)}>
                        <p className='noselect'>{'>'}</p>
                    </div>
                    : null
                }
            </div>
        </div>
    }

    hasLeft() {
        return this.state.currentOrder > 1
    }

    hasRight() {
        return this.state.currentOrder < projApp.lottery.round
    }

    left() {
        if (!this.hasLeft()) return
        if (this.roundMove.isMoving()) return
        this.setState({
            currentOrder: this.state.currentOrder - 1,
        })

        const newPos = this.state.position + this.step
        this.roundMove.move(
            (distance) => { this.setState({ position: this.state.position + distance }) },
            () => { return this.state.position >= newPos },
            () => { this.setState({ position: newPos }) }
        )
    }

    right() {
        if (!this.hasRight()) return
        if (this.roundMove.isMoving()) return
        this.setState({
            currentOrder: this.state.currentOrder + 1,
        })
        const newPos = this.state.position - this.step
        this.roundMove.move(
            (distance) => { this.setState({ position: this.state.position - distance }) },
            () => { return this.state.position <= newPos },
            () => { this.setState({ position: newPos }) }
        )
    }
}

class RoundScroll extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const r = []
        for (let i = 0; i < projApp.lottery.round; i++) {
            r.push(<OneRound key={i} id={i + 1} />)
        }

        return <div className='round-scroll' style={{ left: this.props.position }}>
            {r}
        </div>
    }
}

class OneRound extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const roundInfo = projApp.lottery.getRoundById(this.props.id)
        const hasWinner = roundInfo.winner != MacroSymbol.No
        return <div className='one-round'>
            <div className='pair'>
                <p>Round:</p>
                <p className='order'>{this.props.id}</p>
            </div>
            <div className='pair'>
                <p>Quantity:</p>
                <p className='quan'>{roundInfo.quantity}</p>
            </div>
            <div className='pair'>
                <p>Winner:</p>
                <p className='winner'>
                    {hasWinner ? `${roundInfo.winner.slice(0, 6)}...` : MacroSymbol.No}
                </p>
            </div>
            {hasWinner
                ? null
                : roundInfo.diff <= 0
                    ? <button className='btn-draw' onClick={this.onBtnDraw.bind(this)}>Draw</button>
                    : <p className='drawable'>drawable after {roundInfo.diff} blocks</p>
            }
        </div>
    }

    onBtnDraw() {
        let tx
        projApp.lottery.txDrawWinner(this.props.id)
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

export default LORound