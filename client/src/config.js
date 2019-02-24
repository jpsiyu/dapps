import CDEntry from './cryto-door/cd-entry'
import CDApp from './cryto-door/cd-app'
import CBEntry from './cryto-box/cb-entry'
import CBApp from './cryto-box/cb-app'
import SPEntry from './simple-ponzi/sp-entry'
import SPApp from './simple-ponzi/sp-app'

const projects = [
    { id: 1, name: 'Cryto Door', link: '/door', comp: CDEntry, app: CDApp, img: '/images/proj-cryto-door.png' },
    { id: 2, name: 'Cryto Box', link: '/box', comp: CBEntry, app: CBApp, img: '/images/proj-cryto-box.png' },
    { id: 3, name: 'Ponzi', link: '/ponzi', comp: SPEntry, app: SPApp, img: '/images/proj-simple-ponzi.png' },
]

export default { projects }