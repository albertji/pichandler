import { combineReducers } from 'redux'
import pichandler from './reducers/pichandler'
import curvePanel from './reducers/curvePanel'
import curveCanvas from './reducers/curveCanvas'

export default combineReducers({
  pichandler,
  curvePanel,
  curveCanvas
})
