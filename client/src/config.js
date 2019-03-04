import CDEntry from './cryto-door/cd-entry'
import CDApp from './cryto-door/cd-app'
import CBEntry from './cryto-box/cb-entry'
import CBApp from './cryto-box/cb-app'
import SPEntry from './simple-ponzi/sp-entry'
import SPApp from './simple-ponzi/sp-app'
import LOEntry from './lottery/lo-entry'
import LOApp from './lottery/lo-app'

const projects = [
    { id: 1, name: 'Cryto Door', link: '/door', comp: CDEntry, app: CDApp, img: '/images/proj-cryto-door.png' },
    { id: 2, name: 'Cryto Box', link: '/box', comp: CBEntry, app: CBApp, img: '/images/proj-cryto-box.png' },
    /*
    { id: 3, name: 'Ponzi', link: '/ponzi', comp: SPEntry, app: SPApp, img: '/images/proj-simple-ponzi.png' },
    { id: 4, name: 'Lottery', link: '/lottery', comp: LOEntry, app: LOApp, img: '/images/proj-lottery.png' },
    */
]

export default { projects }