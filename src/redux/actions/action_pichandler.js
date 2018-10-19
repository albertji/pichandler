export const UPDATE_CANVAS_SIZE = 'UPDATE_CANVAS_SIZE'
export const UPDATE_POSITION = 'UPDATE_POSITION'

export function updateCanvasSize(width, height) {
  return {
    type: UPDATE_CANVAS_SIZE,
    data: { width, height }
  }
}

export function updatePosition(x, y) {
  return {
    type: UPDATE_POSITION,
    data: { x, y }
  }
}
