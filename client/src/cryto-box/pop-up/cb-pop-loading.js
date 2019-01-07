import React from 'react'

class CBPopLoading extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div className='cb-pop-loading'>
            <img src='/images/loading.gif' />
        </div>
    }
}

export default CBPopLoading