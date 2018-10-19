export const SELECT_CURVE_PANEL = 'SELECT_CURVE_PANEL'
export const UNSELECT_CURVE_PANEL = 'UNSELECT_CURVE_PANEL'
export const UPDATE_CURVEPANEL_POSITION = 'UPDATE_CURVEPANEL_POSITION'

export function selectCurvePanel(position) {
  return {
    type: SELECT_CURVE_PANEL,
    position
  }
}
export function unselectCurvePanel() {
  return {
    type: UNSELECT_CURVE_PANEL
  }
}
export function updateCurvePanelPosition(left, top) {
  return {
    type: UPDATE_CURVEPANEL_POSITION,
    position: {
      left,
      top
    }
  }
}
