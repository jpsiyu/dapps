import { MacroEvent } from './cb-macro'

class CBUtils {
    static showPopUp(name, viewData) {
        projApp.eventMgr.dispatch(MacroEvent.PopUp, { name: name, show: true, viewData })
    }

    static hidePopUp(name) {
        projApp.eventMgr.dispatch(MacroEvent.PopUp, { name: name, show: false })
    }
}

export default CBUtils