import {
  SELECT_CURVE_PANEL,
  UNSELECT_CURVE_PANEL,
  UPDATE_CURVEPANEL_POSITION
} from '../actions/action_curvepanel'

const initState = {
  selected: false,
  selectedPosition: {
    // 鼠标左键点击下去时候的鼠标位置
    left: 0,
    top: 0
  },
  startPosition: {
    // 鼠标左键点击下去时候面板的位置
    left: 0,
    top: 0
  },
  position: {
    // 面板位置
    left: 800,
    top: 100
  }
}

export default function reducer(state = initState, action) {
  switch (action.type) {
    case SELECT_CURVE_PANEL:
      return {
        ...state,
        selected: true,
        selectedPosition: {
          left: action.position.left,
          top: action.position.top
        },
        startPosition: {
          left: state.position.left,
          top: state.position.top
        }
      }
    case UNSELECT_CURVE_PANEL:
      return {
        ...state,
        selected: false
      }
    case UPDATE_CURVEPANEL_POSITION:
      return {
        ...state,
        position: {
          left: action.position.left,
          top: action.position.top
        }
      }
    default:
      return state
  }
}
