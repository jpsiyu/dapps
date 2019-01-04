import qs from 'query-string'
import config from './config'

class App {
    constructor() {
        this.search = null
        this.projCfg = null
    }

    init() {
        this.search = qs.parse(location.search)
        this.setProjCfg()
        this.setProjApp()
    }

    setProjCfg() {
        if (!this.search.target) return
        for (let i = 0; i < config.projects.length; i++) {
            const cfg = config.projects[i]
            if (cfg.target == this.search.target) {
                this.projCfg = cfg
                break
            }
        }
    }

    setProjApp() {
        if (!this.projCfg) return
        const AppClass = this.projCfg.app
        if (!AppClass) return
        window.projApp = new AppClass()
        projApp.run()
    }
}

export default App