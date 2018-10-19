import {
  UPDATE_CANVAS_SIZE,
  UPDATE_POSITION
} from '../actions/action_pichandler'

const initState = {
  canvasSize: {
    width: 500,
    height: 300
  },
  canvasData: {
    boxes: [
      {
        rect: [0, 0, 100, 100]
      }
    ]
  }
}

export default function reducer(state = initState, action) {
  switch (action.type) {
    case UPDATE_POSITION: {
      const boxes = JSON.parse(JSON.stringify(state.canvasData.boxes))
      const bwidth = boxes[0].rect[2] - boxes[0].rect[0]
      const bheight = boxes[0].rect[3] - boxes[0].rect[1]
      boxes[0].rect = [
        action.data.x,
        action.data.y,
        action.data.x + bwidth,
        action.data.y + bheight
      ]
      return {
        ...state,
        canvasData: {
          boxes
        }
      }
    }
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
