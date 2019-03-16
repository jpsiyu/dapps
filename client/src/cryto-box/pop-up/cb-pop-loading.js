import React from 'react'

class CBPopLoading extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div className='cb-pop-loading'>
            <img src='/static/images/loading.gif' />
        </div>
    }
}

export default CBPopLoading