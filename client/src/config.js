import CDEntry from './cryto-door/cd-entry'
import CDApp from './cryto-door/cd-app'
import CBEntry from './cryto-box/cb-entry'
import CBApp from './cryto-box/cb-app'

const projects = [
    { id: 1, name: 'Cryto Door', target: 'door', comp: CDEntry, app: CDApp, img: '/images/proj-cryto-door.png' },
    { id: 2, name: 'Cryto Box', target: 'box', comp: CBEntry, app: CBApp, img: '/images/proj-cryto-box.png' },
    { id: 3, name: '?', target: null, comp: null, app: null, img: null },
]

export default { projects }