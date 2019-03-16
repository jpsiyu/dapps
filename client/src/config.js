import React from 'react'

const CDEntry = React.lazy(() => import('./cryto-door/cd-entry'))
const CBEntry = React.lazy(() => import('./cryto-box/cb-entry'))
const SPEntry = React.lazy(() => import('./simple-ponzi/sp-entry'))
const LOEntry = React.lazy(() => import('./lottery/lo-entry'))

const projects = [
    { id: 1, name: 'Cryto Door', link: '/door', comp: CDEntry, img: '/static/images/proj-cryto-door.png' },
    { id: 2, name: 'Cryto Box', link: '/box', comp: CBEntry, img: '/static/images/proj-cryto-box.png' },
    { id: 3, name: 'Ponzi', link: '/ponzi', comp: SPEntry, img: '/static/images/proj-simple-ponzi.png' },
    { id: 4, name: 'Lottery', link: '/lottery', comp: LOEntry, img: '/static/images/proj-lottery.png' },
]

export default { projects }