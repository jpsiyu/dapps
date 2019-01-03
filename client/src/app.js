import qs from 'query-string'
import config from './config'

class App {
    constructor() {
        this.search = null
        this.projectCfg = null
    }

    init() {
        this.search = qs.parse(location.search)

        if (this.search.target) {
            for (let i = 0; i < config.projects.length; i++) {
                const cfg = config.projects[i]
                if (cfg.target == this.search.target) {
                    this.projectCfg = cfg
                    break
                }
            }
        }
    }
}

export default App