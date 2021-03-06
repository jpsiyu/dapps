import React from 'react'
import { MacroPopUp } from '../cb-macro'
import CBUtils from '../cb-utils'
import Transaction from '../../common/transaction'

class CBPopAdd extends React.Component {
    constructor(props) {
        super(props)
        this.inputRef = React.createRef()
        this.state = {
            errorMsg: ''
        }
        this.oldValue = ''
    }

    render() {
        if (projApp.crytoBox.isFull())
            return this.renderFull()
        else
            return this.renderAdd()
    }

    renderAdd() {
        return <div className='cb-pop-add'>
            {this.renderTitle()}
            <div className='detail'>
                <p>Give it a name:</p>
                <input ref={this.inputRef} onChange={this.onAddChange.bind(this)} />
                <div className='error'>
                    <p>{this.state.errorMsg}</p>
                </div>
            </div>
            <div className='ok'>
                <button className='btn btn-add' onClick={this.onAddClick.bind(this)}>Sure</button>
            </div>
        </div>
    }

    renderFull() {
        return <div className='cb-pop-add'>
            {this.renderTitle()}
            <div className='full'>
                <p>Cannot add more, the storate box is full!</p>
            </div>
        </div>
    }

    renderTitle() {
        return <div className='title'>
            <h2>Add Goods</h2>
            <button className='btn btn-cancle' onClick={this.onCancelClick.bind(this)}>X</button>
        </div>
    }

    onAddChange() {
        this.setState({ errorMsg: '' })

        const value = this.inputRef.current.value
        if (value.length > 20)
            this.inputRef.current.value = this.oldValue
        else
            this.oldValue = value
    }

    onAddClick() {
        let tx 
        const value = this.inputRef.current.value
        if (!value) {
            this.setState({ errorMsg: 'Name can not be empty!' })
        } else {
            CBUtils.showPopUp(MacroPopUp.Loading)
            projApp.crytoBox.addGoods(value)
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
                    CBUtils.hidePopUp(MacroPopUp.Add)
                    CBUtils.hidePopUp(MacroPopUp.Loading)
                })
                .catch(error => {
                    console.log(error)
                    CBUtils.hidePopUp(MacroPopUp.Loading)
                })
        }
    }

    onCancelClick() {
        CBUtils.hidePopUp(MacroPopUp.Add)
    }
}

export default CBPopAdd