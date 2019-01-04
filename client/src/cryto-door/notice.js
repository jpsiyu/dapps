import React from 'react'
import Utils from './utils';

class Notice extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div className='notice'>
            <div className='content'>
                <div className='title'>
                    <p>Notice</p>
                </div>
                <div className='msg'>
                    {this.props.children}
                </div>
                <div className='ok'>
                    <button className='n-btn btn' onClick={this.onOKClick.bind(this)}>OK</button>
                </div>
            </div>
        </div>
    }

    onOKClick() {
        if (this.props.cb) this.props.cb()
        Utils.noticeAccept()
    }
}

export default Notice