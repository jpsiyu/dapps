import React from 'react'
import ReactDOM from 'react-dom'
import Entry from './entry'
import App from './app'

window.app = new App()
app.init()

ReactDOM.render(
    <Entry />,
    document.getElementById('root')
)