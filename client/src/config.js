import React from 'react'

class House extends React.Component {
    render() {
        return <p>House</p>
    }
}

class Door extends React.Component {
    render() {
        return <p>Door</p>
    }
}

const projects = [
    { id: 1, name: 'World House', target: 'house', comp: House },
    { id: 2, name: 'Cryto Door', target: 'door', comp: Door },
    { id: 3, name: '?', target: null, comp: null },
]

export default { projects }