import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../assets/css/main.css'
import { xyChangecan, xyChangedat } from '../../../utils/util'
import {
  setCurrentPoint,
  setMatchFlag,
  setIsBase,
  updatePoints,
  updateList,
  setDragFlag,
  updatePointByIndex
} from '../../../redux/actions/action_curvecanvas'
import numbers from '../../../plugins/numbers'

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

  resetdata = async () => {
    this.curveCtx.clearRect(0, 0, this.cHeight, this.cWidth)
    this.props.reDrawPainter()
    this.drawReferLine()
    await this.drawPoints()
    this.drawLines()
    await this.drawBasePoints()
  }

  drawReferLine = () => {
    // 画参考线
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

  drawPoints = async () => {
    // 画感应点集
    await this.props.setMatchFlag(false)
    await this.props.setIsBase(false)
    for (let i = 0; i < this.props.list.length; i++) {
      const arr = xyChangecan(
        this.props.list[i],
        { width: this.cWidth, height: this.cHeight },
        { width: 255, height: 255 }
      )
      await this.drawCircle(arr, i, false)
    }
    if (!this.props.matchFlag && !this.props.dragFlag) {
      this.props.setCurrentPoint(false)
    }
  }

  drawCircle = async (arr, index, baseFlag) => {
    const transArr = [arr[0], this.cHeight - arr[1]]
    this.curveCtx.beginPath()
    this.curveCtx.strokeStyle = 'rgba(255,255,255,0)'
    this.curveCtx.arc(transArr[0], transArr[1], 5, 0, 2 * Math.PI)
    this.curveCtx.stroke()
    await this.isPointInStroke(index, baseFlag)
  }

  drawBasePoints = () => {
    // 画基准点集
    for (let i = 0; i < this.props.points.length; i++) {
      const arr = xyChangecan(
        this.props.points[i],
        { width: this.cWidth, height: this.cHeight },
        { width: 255, height: 255 }
      )
      this.drawBaseCircle(arr, i, true)
    }
  }

  drawBaseCircle = (arr, index, baseFlag) => {
    const transArr = [arr[0], this.cHeight - arr[1]]
    this.curveCtx.beginPath()
    this.curveCtx.strokeStyle = 'rgba(60,150,255,1)'
    this.curveCtx.fillStyle = 'rgba(60,150,255,1)'
    this.curveCtx.arc(transArr[0], transArr[1], 5, 0, 2 * Math.PI)
    this.curveCtx.stroke()
    this.curveCtx.fill()
    this.isPointInStroke(index, baseFlag)
  }

  drawLines = () => {
    for (let i = 0; i < this.props.list.length - 1; i++) {
      const arr = xyChangecan(
        this.props.list[i],
        { width: this.cWidth, height: this.cHeight },
        { width: 255, height: 255 }
      )
      const transArr = [arr[0], this.cHeight - arr[1]]
      const arrNext = xyChangecan(
        this.props.list[i + 1],
        { width: this.cWidth, height: this.cHeight },
        { width: 255, height: 255 }
      )
      const transArrNext = [arrNext[0], this.cHeight - arrNext[1]]
      this.curveCtx.beginPath()
      this.curveCtx.lineWidth = 2
      this.curveCtx.strokeStyle = 'rgba(0,0,0,1)'
      this.curveCtx.moveTo(transArr[0], transArr[1])
      this.curveCtx.lineTo(transArrNext[0], transArrNext[1])
      this.curveCtx.stroke()
    }
  }

  isPointInStroke = async (index, baseFlag) => {
    if (!this.props.dragFlag) {
      if (this.curveCtx.isPointInPath(this.hover.x, this.hover.y)) {
        await this.props.setCurrentPoint(index)
        await this.props.setMatchFlag(true)
        await this.props.setIsBase(baseFlag)
      }
    } else {
      if (this.curveCtx.isPointInPath(this.hover.x, this.hover.y)) {
        // 使更新成所选基准点
        await this.props.setCurrentPoint(index)
      }
    }
  }

  addBasePoint = async point => {
    const pt = [parseInt(point[0], 10), parseInt(point[1], 10)]
    const tmpPoints = JSON.parse(JSON.stringify(this.props.points))
    tmpPoints.push(pt)
    for (let j = 0; j < tmpPoints.length - 1; j++) {
      // 两两比较，如果前一个比后一个大，则交换位置。
      for (let i = 0; i < tmpPoints.length - 1 - j; i++) {
        if (tmpPoints[i][0] > tmpPoints[i + 1][0]) {
          const temp = tmpPoints[i]
          tmpPoints[i] = tmpPoints[i + 1]
          tmpPoints[i + 1] = temp
        }
      }
    }
    await this.props.updatePoints(tmpPoints)
    await this.props.updateList(this.getList(tmpPoints))
    this.resetdata()
  }

  getList = points => {
    const n = points.length - 1
    const xArr = points.map(item => item[0])
    const yArr = points.map(item => item[1])
    const hArr = [] // 步长数组,长度为n
    for (let i = 0; i < points.length - 1; i++) {
      hArr[i] = points[i + 1][0] - points[i][0]
    }
    const rightMatrix = []
    for (let i = 0; i <= n; i++) {
      if (i == 0 || i == n) {
        rightMatrix[i] = [0]
      } else {
        rightMatrix[i] = [
          6 *
            ((yArr[i + 1] - yArr[i]) / hArr[i] -
              (yArr[i] - yArr[i - 1]) / hArr[i - 1])
        ]
      }
    }
    // console.log("hArr: "+JSON.stringify(hArr))
    const leftMatrix = []
    for (let i = 0; i <= n; i++) {
      const tmp = []
      if (i == 0) {
        for (let j = 0; j <= n; j++) {
          tmp[j] = j == 0 ? 1 : 0
        }
        leftMatrix[i] = tmp
      } else if (i == n) {
        for (let j = 0; j <= n; j++) {
          tmp[j] = j == n ? 1 : 0
        }
        leftMatrix[i] = tmp
      } else {
        for (let j = 0; j <= n; j++) {
          if (j == i - 1) tmp[j] = hArr[i - 1]
          else if (j == i) tmp[j] = 2 * (hArr[i - 1] + hArr[i])
          else if (j == i + 1) tmp[j] = hArr[i]
          else tmp[j] = 0
        }
        leftMatrix[i] = tmp
      }
    }

    // console.log("leftMatrix:"+JSON.stringify(leftMatrix))
    // console.log("rightMatrix:"+JSON.stringify(rightMatrix))

    const inverse = numbers.matrix.inverse(numbers.matrix.deepCopy(leftMatrix))
    const mArr = numbers.matrix.multiply(
      numbers.matrix.deepCopy(inverse),
      numbers.matrix.deepCopy(rightMatrix)
    )
    // console.log(mArr)

    const paramses = []
    for (let i = 0; i <= n - 1; i++) {
      const param = {}
      param.a = yArr[i]
      param.b =
        (yArr[i + 1] - yArr[i]) / hArr[i] -
        (hArr[i] * mArr[i]) / 2 -
        (hArr[i] / 6) * (mArr[i + 1] - mArr[i])
      param.c = mArr[i] / 2
      param.d = (mArr[i + 1] - mArr[i]) / (6 * hArr[i])
      param.start = xArr[i]
      param.end = xArr[i + 1]
      paramses[i] = param
    }

    const list = []
    for (let x = 0; x <= 255; x++) {
      let calVal = 0
      for (let t = 0; t < paramses.length; t++) {
        if (x >= paramses[t].start && x < paramses[t].end) {
          const { a, b, c, d } = paramses[t]
          const xi = paramses[t].start
          calVal =
            a +
            b * (x - xi) +
            c * (x - xi) * (x - xi) +
            d * (x - xi) * (x - xi) * (x - xi)
          break
        } else if (x == 255) {
          calVal = 255
        }
      }
      if (calVal < 0) calVal = 0
      if (calVal > 255) calVal = 255
      list.push([x, calVal])
    }
    // console.log(list)
    return list
  }

  handleMouseMove = async event => {
    this.hover = {
      x: event.nativeEvent.offsetX,
      y: event.nativeEvent.offsetY
    }
    if (this.props.dragFlag) {
      if (
        this.props.currentPoint == 0 ||
        this.props.currentPoint == this.props.points.length - 1
      )
        return

      const canarr = [this.hover.x, this.hover.y]
      const dataarr = xyChangedat(
        canarr,
        { width: this.cWidth, height: this.cHeight },
        { width: 255, height: 255 }
      )
      const transData = [
        parseInt(dataarr[0], 10),
        parseInt(255 - dataarr[1], 10)
      ]

      const nextPoint = this.props.points[this.props.currentPoint + 1][0]
      const prePoint = this.props.points[this.props.currentPoint - 1][0]
      if (transData[0] < nextPoint && transData[0] > prePoint) {
        await this.props.updatePointByIndex(this.props.currentPoint, transData) // albert
      } else {
        // this.props.points.splice(this.props.currentPoint, 1)
      }
      await this.props.updateList(this.getList(this.props.points))
    }
    this.resetdata()
  }

  handleMouseDown = async () => {
    if (this.props.currentPoint !== false) {
      // 如果不为false说明在感应点或基准点上
      await this.props.setDragFlag(true)
      if (!this.props.isbase) {
        this.addBasePoint(this.props.list[this.props.currentPoint])
      }
    }
  }

  handleWrapperMouseDown = event => {
    event.stopPropagation()
  }

  render() {
    return (
      <div
        id="curve"
        className="curve"
        onMouseDown={this.handleWrapperMouseDown}
      >
        <canvas
          id="curvecanvas"
          className="curvecanvas"
          width={this.cWidth}
          height={this.cHeight}
          onMouseMove={this.handleMouseMove}
          onMouseDown={this.handleMouseDown}
        />
      </div>
    )
  }
}

const mapStatetoProps = state => ({
  points: state.curveCanvas.points,
  list: state.curveCanvas.list,
  currentPoint: state.curveCanvas.currentPoint,
  dragFlag: state.curveCanvas.dragFlag,
  matchFlag: state.curveCanvas.matchFlag,
  isbase: state.curveCanvas.isbase
})
const mapDispatchToProps = dispatch => ({
  setCurrentPoint: index => dispatch(setCurrentPoint(index)),
  setMatchFlag: flag => dispatch(setMatchFlag(flag)),
  setIsBase: baseFlag => dispatch(setIsBase(baseFlag)),
  updatePoints: points => dispatch(updatePoints(points)),
  updateList: list => dispatch(updateList(list)),
  setDragFlag: flag => dispatch(setDragFlag(flag)),
  updatePointByIndex: (index, point) =>
    dispatch(updatePointByIndex(index, point))
})
export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(Curve)
