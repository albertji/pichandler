import {
  SET_CURRENT_POINT,
  SET_MATCH_FLAG,
  SET_ISBASE,
  UPDATE_POINTS,
  UPDATE_LIST,
  SET_DRAG_FLAG
} from '../actions/action_curvecanvas'

const getInitList = () => {
  const list = []
  for (let i = 0; i <= 255; i++) {
    list.push([i, i])
  }
  return list
}

const initState = {
  points: [[0, 0], [255, 255]],
  list: getInitList(),
  dragFlag: false,
  matchFlag: false,
  isbase: false, // 是否是基准点,
  currentPoint: false
}

export default function reducer(state = initState, action) {
  switch (action.type) {
    case SET_CURRENT_POINT:
      return {
        ...state,
        currentPoint: action.index
      }
    case SET_MATCH_FLAG:
      return {
        ...state,
        matchFlag: action.flag
      }
    case SET_ISBASE:
      return {
        ...state,
        isbase: action.baseFlag
      }
    case UPDATE_POINTS:
      return {
        ...state,
        points: action.points
      }
    case UPDATE_LIST:
      return {
        ...state,
        list: action.list
      }
    case SET_DRAG_FLAG:
      return {
        ...state,
        dragFlag: action.flag
      }
    default:
      return state
  }
}
