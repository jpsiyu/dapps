import { MacroEvent } from './cb-macro'

class CBUtils {
    static showPopUp(name) {
        projApp.eventMgr.dispatch(MacroEvent.PopUp, { name: name, show: true })
    }

    static hidePopUp(name) {
        projApp.eventMgr.dispatch(MacroEvent.PopUp, { name: name, show: false })
    }
}

export default CBUtils