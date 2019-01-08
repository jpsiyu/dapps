import React from 'react'
import CBUtils from '../cb-utils'
import { MacroPopUp } from '../cb-macro'

class CBPopAssign extends React.Component {
    constructor(props) {
        super(props)
        this.inputRef = React.createRef()
        this.state = {
            errorMsg: ''
        }
    }

    render() {
        const id = this.props.viewData.id
        const name = this.props.viewData.desc

        return <div className='cb-pop-assign'>
            <button className='btn btn-close' onClick={this.onBtnCloseClick.bind(this)}>X</button>
            <div className='title'>
                <h2>Assign Goods</h2>
            </div>
            <div className='detail'>
                <div className='item'>
                    <p className='item-id'>{id}</p>
                    <p>{name}</p>
                </div>
                <div className='account'>
                    <p>assign to </p>
                    <input ref={this.inputRef} onChange={this.onInputChange.bind(this)}></input>
                    <p className='error'>{this.state.errorMsg}</p>
                </div>
            </div>
            <div className='ok'>
                <button className='btn btn-ok' onClick={this.onBtnOkClick.bind(this)}>Sure</button>
            </div>
        </div>
    }


    onBtnCloseClick() {
        CBUtils.hidePopUp(MacroPopUp.Assign)
    }

    onBtnOkClick() {
        const value = this.inputRef.current.value
        const valid = projApp.metamask.web3.utils.isAddress(value)
        if (!valid) {
            this.setState({ errorMsg: 'Not valid address!' })
            return
        }

        CBUtils.showPopUp(MacroPopUp.Loading)
        projApp.crytoBox.assign(this.props.viewData.id, value)
            .then(res => {
                console.log(res)
            })
            .then(() => {
                return projApp.crytoBox.reload()
            })
            .then(() => {
                CBUtils.hidePopUp(MacroPopUp.Assign)
                CBUtils.hidePopUp(MacroPopUp.Loading)
            })
            .catch(error => {
                console.log(error)
                CBUtils.hidePopUp(MacroPopUp.Loading)
            })
    }

    onInputChange() {
        this.setState({ errorMsg: '' })
    }
}

export default CBPopAssign