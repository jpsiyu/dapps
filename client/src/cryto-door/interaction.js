import React from 'react'
import OwnerMe from './owner/owner-me'
import OwnerNone from './owner/owner-none'
import OwnerOther from './owner/owner-other'
import MMGuide from '../common/mm-guide'
import { MacroEvent } from './macro'
import Notice from './notice'
import Utils from './utils';

class Interaction extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            showLoading: false,
            noticeMsg: null,
            noticeCb: null,
        }
    }

    render() {
        if (!this.state.show) return null
        return <div className='interaction'>
            {projApp.mmCheck.pass()
                ? this.renderByState()
                : <MMGuide />
            }
            {this.renderNotice()}
            {this.state.showLoading ? this.renderLoading() : null}
        </div>
    }

    renderByState() {
        return projApp.crytoDoor.keyHolder == 0
            ? <OwnerNone />
            : projApp.metamask.isEqualAccount(projApp.crytoDoor.keyHolder)
                ? <OwnerMe />
                : <OwnerOther />
    }

    renderTool() {
        return <div className='interaction-tool'>
            <button className='tool-btn btn' onClick={this.sendMoney.bind(this)}>Send Money</button>
        </div>
    }

    renderLoading() {
        return <div className='loading'>
            <img src='/images/cryto-door/loading.gif' />
        </div>
    }

    renderNotice() {
        return this.state.noticeMsg
            ? <Notice cb={this.state.noticeCb || null}>{this.state.noticeMsg}</Notice>
            : null
    }

    componentDidMount() {
        projApp.eventMgr.subscribe(MacroEvent.Run, this, this.receRun.bind(this))
        projApp.eventMgr.subscribe(MacroEvent.Loading, this, this.receLoading.bind(this))
        projApp.eventMgr.subscribe(MacroEvent.ContractReload, this, this.receContractReload.bind(this))
        projApp.eventMgr.subscribe(MacroEvent.Notice, this, this.receNotice.bind(this))
        projApp.eventMgr.subscribe(MacroEvent.NoticeAccept, this, this.receNoticeAccept.bind(this))
    }

    componentWillMount() {
        projApp.eventMgr.unsubscribe(MacroEvent.Run, this)
        projApp.eventMgr.unsubscribe(MacroEvent.Loading, this)
        projApp.eventMgr.unsubscribe(MacroEvent.ContractReload, this)
        projApp.eventMgr.unsubscribe(MacroEvent.Notice, this)
        projApp.eventMgr.unsubscribe(MacroEvent.NoticeAccept, this)
    }

    receContractReload() {
        this.forceUpdate()
    }

    receRun() {
        this.setState({
            show: true
        })
    }


    receLoading(open) {
        this.setState({
            showLoading: open
        })
    }

    receNotice(notice) {
        this.setState({
            noticeMsg: notice.msg,
            noticeCb: notice.cb ? notice.cb : null,
        })
    }

    receNoticeAccept() {
        this.setState({ noticeMsg: null, noticeCb: null })
    }

    sendMoney() {
        Utils.loading(true)
        projApp.metamask.web3.eth.sendTransaction({
            from: projApp.metamask.account,
            to: projApp.crytoDoor.instance.address,
            value: projApp.metamask.web3.utils.toWei('0.01', 'ether'),
        }).then((res) => {
            console.log('tx:', res)
        }).then(() => {
            projApp.crytoDoor.reload()
        }).then(() => {
            Utils.loading(false)
        }).catch(err => {
            console.log(err)
            Utils.loading(false)
        })
    }

}

export default Interaction