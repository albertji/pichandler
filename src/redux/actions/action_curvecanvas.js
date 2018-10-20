export const SET_CURRENT_POINT = 'SET_CURRENT_POINT'
export const SET_MATCH_FLAG = 'SET_MATCH_FLAG'
export const SET_ISBASE = 'SET_ISBASE'
export const UPDATE_POINTS = 'UPDATE_POINTS'
export const UPDATE_LIST = 'UPDATE_LIST'
export const SET_DRAG_FLAG = 'SET_DRAG_FLAG'

function actionSetCurrentPoint(index) {
  return {
    type: SET_CURRENT_POINT,
    index
  }
}

export function setCurrentPoint(index) {
  return function(dispatch) {
    return new Promise(resolve => {
      dispatch(actionSetCurrentPoint(index))
      resolve()
    })
  }
}

function actionSetMatchFlag(flag) {
  return {
    type: SET_MATCH_FLAG,
    flag
  }
}

export function setMatchFlag(flag) {
  return function(dispatch) {
    return new Promise(resolve => {
      dispatch(actionSetMatchFlag(flag))
      resolve()
    })
  }
}

function actionSetIsBase(baseFlag) {
  return {
    type: SET_ISBASE,
    baseFlag
  }
}
export function setIsBase(baseFlag) {
  return function(dispatch) {
    return new Promise(resolve => {
      dispatch(actionSetIsBase(baseFlag))
      resolve()
    })
  }
}

function actionUpdatePoints(points) {
  return {
    type: UPDATE_POINTS,
    points
  }
}
export function updatePoints(points) {
  return function(dispatch) {
    return new Promise(resolve => {
      dispatch(actionUpdatePoints(points))
      resolve()
    })
  }
}

function actionUpdateList(list) {
  return {
    type: UPDATE_LIST,
    list
  }
}
export function updateList(list) {
  return function(dispatch) {
    return new Promise(resolve => {
      dispatch(actionUpdateList(list))
      resolve()
    })
  }
}

function actionSetDragFlag(flag) {
  return {
    type: SET_DRAG_FLAG,
    flag
  }
}

export function setDragFlag(flag) {
  return function(dispatch) {
    return new Promise(resolve => {
      dispatch(actionSetDragFlag(flag))
      resolve()
    })
  }
}
