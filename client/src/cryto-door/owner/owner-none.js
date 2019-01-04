import React from 'react'
import Utils from '../utils';

const config = [
    { id: 1, title: 'Project A', time: 2, price: 0.1 },
    { id: 2, title: 'Project B', time: 5, price: 0.5 },
]

class OwnerNone extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div className='owner-none'>
            <div className='banner'>
                <h2>Key Market</h2>
            </div>
            <p className='desc'>Key is waiting for someone to hold!</p>
            <div className='items'>
                {this.renderItems()}
            </div>
        </div>
    }

    renderItems() {
        const items = []
        config.forEach(cfg => {
            items.push(<MarketItem key={cfg.id} cfg={cfg} />)
        })
        return items
    }

}

class MarketItem extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const cfg = this.props.cfg
        return <div className='market-item'>
            <h2 className='title'>{cfg.title}</h2>
            <div className='desc'>
                <div className='pair'>
                    <p>Price</p>
                    <p>{cfg.price} eth</p>
                </div>
                <div className='pair'>
                    <p>Time</p>
                    <p>{cfg.time} min</p>
                </div>
            </div>
            <div className='purchase'>
                <button
                    className='market-btn btn'
                    onClick={() => this.purchase(cfg.time, cfg.price)}>
                    Purchase
                </button>
            </div>
        </div>
    }

    purchase(min, price) {
        Utils.loading(true)
        projApp.crytoDoor.purchase(min, price)
            .then(res => {
                console.log(res)
            })
            .then(() => {
                return projApp.crytoDoor.reload()
            })
            .then(() => {
                Utils.loading(false)
            })
            .catch(err => {
                Utils.loading(false)
                Utils.notice(err.toString())
            })
    }
}

export default OwnerNone