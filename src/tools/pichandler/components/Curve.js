import React, { Component } from 'react'
// import { connect } from 'react-redux'
import '../assets/css/main.css'
import connect from 'react-redux/es/connect/connect'
import { xyChangecan } from '../../../utils/util'

class Curve extends Component {
  constructor(props) {
    super(props)
    this.state = null
    this.cHeight = 250
    this.cWidth = 250
    this.curveCanvas = null
    this.curveCtx = null
    this.hover = {
      // 鼠标坐标，相对于画布
      x: 0,
      y: 0
    }
  }

  componentDidMount() {
    if (this.props.onRef) {
      this.props.onRef(this)
    }
    this.curveCanvas = document.getElementById('curvecanvas')
    this.curveCtx = this.curveCanvas.getContext('2d')
    this.resetdata()
  }

  resetdata = () => {
    this.curveCtx.clearRect(0, 0, this.cHeight, this.cWidth)
    this.drawReferLine()
    this.drawpoints()
  }

  drawReferLine = () => {
    const arr = xyChangecan(
      [0, 0],
      { width: this.cWidth, height: this.cHeight },
      { width: 255, height: 255 }
    )
    const transArr = [arr[0], this.cHeight - arr[1]]
    const arrNext = xyChangecan(
      [255, 255],
      { width: this.cWidth, height: this.cHeight },
      { width: 255, height: 255 }
    )
    const transArrNext = [arrNext[0], this.cHeight - arrNext[1]]
    this.curveCtx.beginPath()
    this.curveCtx.lineWidth = 1
    this.curveCtx.strokeStyle = '#b2b2b2'
    this.curveCtx.moveTo(transArr[0], transArr[1])
    this.curveCtx.lineTo(transArrNext[0], transArrNext[1])
    this.curveCtx.stroke()
  }

  drawpoints = () => {
    // match_flag = false
    // isbase = false
    for (let i = 0; i < this.props.list.length; i++) {
      const arr = xyChangecan(
        this.props.list[i],
        { width: this.cWidth, height: this.cHeight },
        { width: 255, height: 255 }
      )
      this.drawCircle(arr, i, false)
    }
    // if(!match_flag && !drag_flag){
    //   current_point = false
    // }
  }

  drawCircle = (arr, index, baseFlag) => {
    const transArr = [arr[0], this.cHeight - arr[1]]
    this.curveCtx.beginPath()
    this.curveCtx.strokeStyle = 'rgba(255,255,255,1)'
    this.curveCtx.arc(transArr[0], transArr[1], 5, 0, 2 * Math.PI)
    this.curveCtx.stroke()
    this.isPointInStroke(index, baseFlag)
  }

  isPointInStroke = (index, baseFlag) => {
    /*    if(!drag_flag) {
      if(curve_ctx.isPointInPath(hover['x'], hover['y'])) {
        current_point = index
        match_flag = true
        isbase = base_flag
      }
    }
    else{
      if(curve_ctx.isPointInPath(hover['x'], hover['y'])) {
        current_point = index
      }
    } */
  }

  handleMouseMove = event => {
    this.hover = {
      x: event.nativeEvent.offsetX,
      y: event.nativeEvent.offsetY
    }
    console.log(this.hover)
  }

  render() {
    return (
      <div id="curve" className="curve">
        <canvas
          id="curvecanvas"
          className="curvecanvas"
          width={this.cWidth}
          height={this.cHeight}
          onMouseMove={this.handleMouseMove}
        />
      </div>
    )
  }
}

const mapStatetoProps = state => ({
  points: state.curveCanvas.points,
  list: state.curveCanvas.list
})
const mapDispatchToProps = () => ({})
export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(Curve)
