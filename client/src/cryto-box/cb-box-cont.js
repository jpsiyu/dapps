import React from 'react'
import MMGuide from '../common/mm-guide'
import { MacroEvent, MacroPopUp } from './cb-macro'
import CBUtils from './cb-utils'

class CBBoxCont extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            active: false,
        }
    }

    componentDidMount() {
        projApp.eventMgr.subscribe(MacroEvent.Run, this, this.receRun.bind(this))
        projApp.eventMgr.subscribe(MacroEvent.ContractReload, this, () => this.forceUpdate())
    }

    componentWillUnmount() {
        projApp.eventMgr.unsubscribe(MacroEvent.Run, this)
        projApp.eventMgr.unsubscribe(MacroEvent.ContractReload, this)
    }

    render() {
        if (!this.state.active) return null
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
                <p>{this.props.goodsInfo.id}</p>
            </div>
            <div className='part-b'>
                <p>{this.props.goodsInfo.desc}</p>
            </div>
            <div className='part-c'>
                <button className='btn-take btn' onClick={this.onTakeOutClick.bind(this)}>Take Out</button>
                <button className='btn-assign btn'>Assign</button>
            </div>
        </div>
    }

    onTakeOutClick() {
        CBUtils.showPopUp(MacroPopUp.Loading)
        projApp.crytoBox.takeOut(this.props.goodsInfo.id)
            .then(res => {
                console.log(res)
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
}

export default CBBoxCont