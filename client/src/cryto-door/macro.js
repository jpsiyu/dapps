const MacroEvent = {
    Run: 'Run',
    ContractReload: 'ContractReload',
    Notice: 'Notice',
    NoticeAccept: 'NoticeAccept',
    Loading: 'Loading',
}

const MacroMap = {
    CanvasWidth: 400,
    CanvasHeight: 400,
    HouseWidth: 400,
    HouseHeight: 400,
    DoorWidth: 95,
    DoorHeight: 145,
}

const MacroDoorState = {
    Normal: 'Normal',
    Opening: 'Opening',
    Closing: 'Closing',
}

const MacroNetworkType = {
    MainNet: 1,
    Morden: 2,
    Ropsten: 3,
    Rinkeby: 4,
    Kovan: 42,
    Private: 999,
}

export {
    MacroEvent,
    MacroMap,
    MacroDoorState,
    MacroNetworkType,
}