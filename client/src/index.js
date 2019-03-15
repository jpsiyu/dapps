import React from 'react'
import ReactDOM from 'react-dom'
import Entry from './entry'

class App {
    resetProjApp(ProjApp) {
        window.projApp = new ProjApp()
    }
}

window.app = new App()

ReactDOM.render(
    <Entry />,
    document.getElementById('root')
)