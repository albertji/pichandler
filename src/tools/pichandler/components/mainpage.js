import React, { Component } from 'react'
import '../assets/css/main.css'
import { connect } from 'react-redux'
import Painter from './painter'
import CurvePanel from './CurvePanel'
import {
  unselectCurvePanel,
  updateCurvePanelPosition
} from '../../../redux/actions/action_curvepanel'

class MainPage extends Component {
  constructor(props) {
    super(props)
    this.state = null
    this.curvePanel = null
  }

  handleMouseUp = () => {
    if (this.props.selected) {
      this.props.unselectCurvePanel()
    }
  }

  handleMouseMove = event => {
    if (this.props.selected) {
      const { left: selectLeft, top: selectTop } = this.props.selectedPosition
      const { left: positionLeft, top: positionTop } = this.props.startPosition
      const finalX = event.clientX - selectLeft + positionLeft
      const finalY = event.clientY - selectTop + positionTop
      this.props.updateCurvePanelPosition(finalX, finalY)
    }
  }

  render() {
    return (
      <div
        className="mainpage"
        id="mainpage"
        onMouseUp={this.handleMouseUp}
        onMouseMove={this.handleMouseMove}
      >
        <Painter />
        <CurvePanel
          onRef={curvePanel => {
            this.curvePanel = curvePanel
          }}
        />
      </div>
    )
  }
}

const mapStatetoProps = state => ({
  selected: state.curvePanel.selected,
  selectedPosition: state.curvePanel.selectedPosition,
  startPosition: state.curvePanel.startPosition,
  position: state.curvePanel.position
})
const mapDispatchToProps = dispatch => ({
  unselectCurvePanel: () => {
    dispatch(unselectCurvePanel())
  },
  updateCurvePanelPosition: (left, top) => {
    dispatch(updateCurvePanelPosition(left, top))
  }
})
export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(MainPage)
