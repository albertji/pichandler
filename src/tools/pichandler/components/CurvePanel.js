import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../assets/css/main.css'
import Curve from './Curve'
import { selectCurvePanel } from '../../../redux/actions/action_curvepanel'

class CurvePanel extends Component {
  constructor(props) {
    super(props)
    this.state = null
  }

  componentDidMount() {
    if (this.props.onRef) {
      this.props.onRef(this)
    }
  }

  handleMouseDown = event => {
    const position = {
      left: event.clientX,
      top: event.clientY
    }
    this.props.selectCurvePanel(position)
  }

  render() {
    const { left: panelLeft, top: panelTop } = this.props.position
    return (
      <div
        id="curvepanel"
        className="curvepanel"
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        style={{ left: `${panelLeft}px`, top: `${panelTop}px` }}
      >
        <Curve />
      </div>
    )
  }
}

const mapStatetoProps = state => ({
  selected: state.curvePanel.selected,
  position: state.curvePanel.position
})
const mapDispatchToProps = dispatch => ({
  selectCurvePanel: position => {
    dispatch(selectCurvePanel(position))
  }
})
export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(CurvePanel)
