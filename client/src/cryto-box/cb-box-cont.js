import React from 'react'
import MMGuide from '../common/mm-guide'
import { MacroEvent, MacroPopUp } from './cb-macro'
import CBUtils from './cb-utils'
import Transaction from '../common/transaction'

class CBBoxCont extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        projApp.eventMgr.subscribe(MacroEvent.ContractReload, this, () => this.forceUpdate())
    }

    componentWillUnmount() {
        projApp.eventMgr.unsubscribe(MacroEvent.ContractReload, this)
    }

    render() {
        if (projApp.mmCheck.pass())
            return this.renderCont()
        else
            return <MMGuide />
    }

    renderCont() {
        return <div className='cb-box-cont'>
            <div className='title'>
                <h2>Your Goods</h2>
                <div className='add'>
                    <button className='btn btn-add' onClick={this.onAddClick.bind(this)}>+</button>
                </div>
            </div>
            <div className='goods-list'>
                {this.renderGoodsList()}
            </div>
        </div>
    }

    renderGoodsList() {
        const l = []
        const gl = projApp.crytoBox.myGoods
        for (let i = 0; i < gl.length; i++) {
            const g = gl[i]
            const goodsInfo = {
                id: g.id,
                desc: g.desc,
            }
            l.push(<GoodsItem goodsInfo={goodsInfo} key={i} />)
        }
        return l
    }

    receRun() {
        this.setState({ active: true })
    }

    onAddClick() {
        CBUtils.showPopUp(MacroPopUp.Add)
    }

}

class GoodsItem extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div className='goods'>
            <div className='part-a'>
                <p className='item-id'>{this.props.goodsInfo.id}</p>
            </div>
            <div className='part-b'>
                <p>{this.props.goodsInfo.desc}</p>
            </div>
            <div className='part-c'>
                <button className='btn-take btn' onClick={this.onTakeOutClick.bind(this)}>Take Out</button>
                <button className='btn-assign btn' onClick={this.onAssignClick.bind(this)}>Assign</button>
            </div>
        </div>
    }

    onTakeOutClick() {
        let tx
        CBUtils.showPopUp(MacroPopUp.Loading)
        projApp.crytoBox.takeOut(this.props.goodsInfo.id)
            .then(res => {
                tx = new Transaction(res, projApp.metamask.web3)
                console.log('receve tx meta')
            })
            .then(() => {
                return tx.waitTxAccept()
            })
            .then(() => {
                return projApp.crytoBox.reload()
            })
            .then(() => {
                CBUtils.hidePopUp(MacroPopUp.Loading)
            })
            .catch(err => {
                console.log(err)
                CBUtils.hidePopUp(MacroPopUp.Loading)
            })
    }

    onAssignClick() {
        CBUtils.showPopUp(MacroPopUp.Assign, this.props.goodsInfo)
    }
}

export default CBBoxCont