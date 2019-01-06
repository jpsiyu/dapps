import React from 'react'
import MMGuide from '../common/mm-guide'
import { MacroEvent } from './macro'

class CBBoxCont extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            active: false
        }
    }

    componentDidMount() {
        projApp.eventMgr.subscribe(MacroEvent.Run, this, this.receRun.bind(this))
    }

    componentWillUnmount() {
        projApp.eventMgr.unsubscribe(MacroEvent.Run, this)
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
            </div>
            <div className='goods-list'>
                {this.renderGoodsList()}
            </div>
        </div>
    }

    renderGoodsList() {
        const l = []
        for (let i = 0; i < 4; i++) {
            const goodsInfo = {
                id: i,
                desc: 'goods hahahaah',
            }
            l.push(<GoodsItem goodsInfo={goodsInfo} key={i} />)
        }
        return l
    }

    receRun() {
        this.setState({ active: true })
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
                <button className='btn-take btn'>Take Out</button>
                <button className='btn-assign btn'>Assign</button>
            </div>
        </div>
    }
}

export default CBBoxCont