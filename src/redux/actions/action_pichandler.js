export const UPDATE_CANVAS_SIZE = 'UPDATE_CANVAS_SIZE'

export function updateCanvasSize(width, height) {
  return {
    type: UPDATE_CANVAS_SIZE,
    data: { width, height }
  }
}
