import {
  UPDATE_UNIVERSE_DATA,
  UPDATE_PLANET_DATA,
  SET_CONTROLLER_BAR_MODE,
  UPDATE_PLANET_POSITION
} from '../../actions/voice/action_voice_tool'

const initState = {
  unidata: [],
  controller_bar_mode: false,
  controller_bar_mode_info: null
}
export default function reducer(state = initState, action) {
  switch (action.type) {
    case UPDATE_UNIVERSE_DATA:
      return {
        ...state,
        unidata: action.data
      }
    case UPDATE_PLANET_DATA: {
      // console.log("galaxy_seq:"+action.galaxy_seq+" planet_seq:"+action.planet_seq)
      const object = JSON.parse(JSON.stringify(state.unidata))
      object[action.galaxy_seq].list[action.planet_seq].val = action.val
      return {
        ...state,
        unidata: object
      }
    }
    case UPDATE_PLANET_POSITION: {
      const obj = JSON.parse(JSON.stringify(state.unidata))
      const {
        galaxy_seq: galaxySeq,
        planet_seq: planetSeq,
        type,
        both
      } = state.controller_bar_mode_info
      let bothFlag = false
      let { val } = action

      if (both) {
        if (type === 1) {
          if (
            planetSeq !== obj[galaxySeq].list.length - 1 &&
            obj[galaxySeq].list[planetSeq].end ===
              obj[galaxySeq].list[planetSeq + 1].start
          ) {
            bothFlag = true
          }
        } else {
          if (
            planetSeq !== 0 &&
            obj[galaxySeq].list[planetSeq].start ===
              obj[galaxySeq].list[planetSeq - 1].end
          ) {
            bothFlag = true
          }
        }
      }
      if (bothFlag) {
        if (type) {
          obj[galaxySeq].list[planetSeq].end = val
          obj[galaxySeq].list[planetSeq + 1].start = val
        } else {
          obj[galaxySeq].list[planetSeq].start = val
          obj[galaxySeq].list[planetSeq - 1].end = val
        }
      } else {
        if (type) {
          if (val < obj[galaxySeq].list[planetSeq].start) {
            val = obj[galaxySeq].list[planetSeq].start
          }
          if (
            planetSeq !== obj[galaxySeq].list.length - 1 &&
            val > obj[galaxySeq].list[planetSeq + 1].start
          ) {
            // 拖动不超过下一个planet
            val = obj[galaxySeq].list[planetSeq + 1].start
          }
          obj[galaxySeq].list[planetSeq].end = val
        } else {
          if (val > obj[galaxySeq].list[planetSeq].end) {
            val = obj[galaxySeq].list[planetSeq].end
          }
          if (planetSeq !== 0 && val < obj[galaxySeq].list[planetSeq - 1].end) {
            val = obj[galaxySeq].list[planetSeq - 1].end
          }
          obj[galaxySeq].list[planetSeq].start = val
        }
      }
      return {
        ...state,
        unidata: obj
      }
    }
    case SET_CONTROLLER_BAR_MODE:
      return {
        ...state,
        controller_bar_mode: action.mode,
        controller_bar_mode_info: action.mode ? action.info : null
      }
    default:
      return state
  }
}
