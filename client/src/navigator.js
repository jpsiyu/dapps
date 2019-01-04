import React from 'react'

class Navigator extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div className='navigator'>
            <div className='part'>
                {
                    app.projCfg
                        ? <img src='/images/home-icon.png' onClick={this.onHomeClick.bind(this)} />
                        : null
                }
            </div>
            <div className='part'>
                <h2>{app.projCfg ? app.projCfg.name : 'Gallary'}</h2>
            </div>
            <div className='part'></div>
        </div>
    }

    onHomeClick() {
        location.href = location.href.split('?')[0]
    }
}

export default Navigator