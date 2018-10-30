import { UPDATE_CANVAS_SIZE } from '../actions/action_pichandler'

const initState = {
  canvasSize: {
    width: 500,
    height: 300
  }
}

export default function reducer(state = initState, action) {
  switch (action.type) {
    case UPDATE_CANVAS_SIZE:
      return {
        ...state,
        canvasSize: {
          width: action.data.width,
          height: action.data.height
        }
      }
    default:
      return state
  }
}
