
export const ActionType ={
    ADD_VALUE : "ADD_VALUE",
    INITIALIZE : "INITIALIZE",
    GAMEPLAY : "GamePlay",
    INTERVALID : "IntervalId",
    ADVANCEID : "advanceId",
    WAITTIME:"waiteTime",
    BLOCKROTATECHANGE:"blockRotateChange",
    BLOCKCHANGE:"blockChange",
    MAPUPDATE:"mapUpdate",
    ADDMINO:"addMino",
    PULLMINO:"pullMino",
    SETPOSITION:"setPosition",
    LEFTPOSITION:"leftPosition",
    RIGHTPOSITION:"rightPosition",
    UPDATEMINO:"updateMino",
    ADVANCEPOSITION:"advancePosition",
    PREBLOCK:"preBlock",
    RESETPREBLOCK:"resetPreBlock",
    SETNEXTBLOCK:"setNextBlock",
    SETHOLDBLOCK:"setHoldBlock",
    ADDSCORE:"addScore",
    TIMEUPDATE:"timeUpdate",
    TIMERESET:"timeReset",
    FLAMEUPDATE:"flameUpdate",
    CHANGEOPTION:"changeOption",
    CHANGESPEED:"changeSpeed",
    PREDICT_POSITION:"predictPosition",
    DROPPOSITION:"dropPosition",
    CHANGE_FLAME:"changeFlame",
    CHANGE_WAIT:"changeWait",
    CHANGE_POSITION:"changePosition",
};



export const addValue = amount => ({type:ActionType.ADD_VALUE, payload:amount});
export const initialize = () => ({type:ActionType.INITIALIZE});
export const makeGame = () => ({type:ActionType.GAMEPLAY, payload:1});
export const resetGame = () => ({type:ActionType.GAMEPLAY, payload:0});
export const setIntervalId = intervalId => ({type:ActionType.INTERVALID, payload:intervalId})
export const setAdvanceId = advanceId => ({type:ActionType.ADVANCEID, payload:advanceId})
export const waitTime = waitTime => ({type:ActionType.WAITTIME, payload:waitTime})
export const blockRotateChange = rotate => ({type:ActionType.BLOCKROTATECHANGE,payload:rotate})
export const blockChange = blockNum => ({type:ActionType.BLOCKCHANGE,payload:blockNum})
export const mapUpdate = map => ({type:ActionType.MAPUPDATE,payload:map})
export const addMino = () => ({type:ActionType.ADDMINO})
export const pullMino = minoAr => ({type:ActionType.PULLMINO,payload:minoAr})
export const setPosition = () => ({type:ActionType.SETPOSITION})
export const leftPosition = () => ({type:ActionType.LEFTPOSITION})
export const rightPosition = () => ({type:ActionType.RIGHTPOSITION})
export const advancePosition = () => ({type:ActionType.ADVANCEPOSITION})
export const dropPosition = () => ({type:ActionType.DROPPOSITION})
export const changePosition = (position) => ({type:ActionType.CHANGE_POSITION,payload:position})
export const updateMino = (mino) => ({type:ActionType.UPDATEMINO,payload:mino})
export const updatePreBlock = (block) => ({type:ActionType.PREBLOCK,payload:block})
export const resetPreBlock = () => ({type:ActionType.RESETPREBLOCK})
export const setNextBlock = (blockBox) => ({type:ActionType.SETNEXTBLOCK,payload:blockBox})
export const setHoldBlock = (holdBlock) => ({type:ActionType.SETHOLDBLOCK,payload:holdBlock})
export const addScore = (score) => ({type:ActionType.ADDSCORE,payload:score});
export const timeUpdate = (time) => ({type:ActionType.TIMEUPDATE,payload:time})
export const flameUpdate = (flame) => ({type:ActionType.FLAMEUPDATE,payload:flame})
export const changeOption = ()=> ({type:ActionType.CHANGEOPTION})
export const changeSpeed = (speed) => ({type:ActionType.CHANGESPEED,payload:speed})
export const predictPosition = (position) => ({type:ActionType.PREDICT_POSITION,payload:position})
export const changeFlame = (flame) => ({type:ActionType.CHANGE_FLAME,payload:flame})
export const changeWait = (wait) => ({type:ActionType.CHANGE_WAIT,payload:wait})