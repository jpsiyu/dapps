class App {
    constructor() {
        this.search = null
        this.projCfg = null
    }

    init(){}

    resetProjApp(cfg) {
        this.projCfg = cfg
        if (!this.projCfg) return
        const AppClass = this.projCfg.app
        if (!AppClass) return
        window.projApp = new AppClass()
        projApp.run()
    }
}

export default App