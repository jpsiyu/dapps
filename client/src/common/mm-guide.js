import React from 'react'

class MMGuide extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const imgBrowser = projApp.mmCheck.browser ? 'yes.png' : 'no.png'
        const imgExtension = projApp.mmCheck.extension ? 'yes.png' : 'no.png'
        const imgUnlock = projApp.mmCheck.unlock ? 'yes.png' : 'no.png'
        const imgNetwork = projApp.mmCheck.network ? 'yes.png' : 'no.png'

        return <div className='mm-guide'>
            <div className='title'>
                <h2>You need to set up correctly</h2>
            </div>

            <div className='item'>
                <p>Use Chrome or Firefox browser</p>
                <img src={`/static/images/cryto-door/${imgBrowser}`} />
            </div>
            <div className='item'>
                <p>Install MetaMask extension</p>
                <img src={`/static/images/cryto-door/${imgExtension}`} />
            </div>
            <div className='item'>
                <p>Login MetaMask to unlock account</p>
                <img src={`/static/images/cryto-door/${imgUnlock}`} />
            </div>
            <div className='item'>
                <p>Switch to Ropsten testnet</p>
                <img src={`/static/images/cryto-door/${imgNetwork}`} />
            </div>
        </div>
    }
}

export default MMGuide