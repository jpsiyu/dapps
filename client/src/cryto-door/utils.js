import { MacroEvent } from "./macro";

class Utils {
    static timeFormat(seconds) {
        const min = Math.floor(seconds / 60)
        const sec = seconds % 60
        const mStr = String('0' + min).slice(-2)
        const sStr = String('0' + sec).slice(-2)
        return `${mStr}:${sStr}`
    }

    static notice(msg, cb) {
        projApp.eventMgr.dispatch(MacroEvent.Notice, { msg, cb })
    }

    static noticeAccept() {
        projApp.eventMgr.dispatch(MacroEvent.NoticeAccept)
    }

    static loading(open) {
        projApp.eventMgr.dispatch(MacroEvent.Loading, open)
    }
}

export default Utils