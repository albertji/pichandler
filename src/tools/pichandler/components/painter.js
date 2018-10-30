import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../assets/css/main.css'
import { updateCanvasSize } from '../../../redux/actions/action_pichandler'
import imgUrl from '../assets/img/bg.jpg'

class Painter extends Component {
  constructor(props) {
    super(props)
    this.state = null
    this.picCanvas = null
    this.picCtx = null
    this.img = null

    this.canvasLeft = 0
    this.canvasTop = 0
  }

  componentDidMount() {
    window.addEventListener('resize', this.onWindowResize)
    if (this.props.onRef) this.props.onRef(this)
    const canvasWidth = document.getElementById('canvascon').offsetWidth
    const canvasHeight = document.getElementById('canvascon').offsetHeight
    this.canvasLeft = document.getElementById('mainpage').offsetLeft + 20
    this.canvasTop = document.getElementById('mainpage').offsetTop + 20
    this.props.updateCanvasSize(canvasWidth, canvasHeight)
    this.initImg()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize)
  }

  onMousemove = () => {
    this.resetData()
  }

  initImg = () => {
    this.img = new Image()
    this.img.crossOrigin = ''
    this.img.src = imgUrl
    this.img.onload = () => {
      console.log('onload')
      this.resetData()
    }
    this.img.onerror = () => {
      console.log('error')
    }
  }

  onWindowResize = () => {
    const canvasWidth = document.getElementById('canvascon').offsetWidth
    const canvasHeight = document.getElementById('canvascon').offsetHeight
    this.props.updateCanvasSize(canvasWidth, canvasHeight)
    this.resetData()
  }

  resetData = () => {
    this.drawBackground()
  }

  drawBackground = () => {
    const { width: canvasWidth, height: canvasHeight } = this.props.canvasSize
    this.picCanvas = document.getElementById('pic')
    this.picCtx = this.picCanvas.getContext('2d')
    this.picCtx.clearRect(0, 0, canvasWidth, canvasHeight)
    this.picCtx.drawImage(this.img, 0, 0, canvasWidth, canvasHeight)
    const pixels = this.picCtx.getImageData(0, 0, canvasWidth, canvasHeight)
    const pixeldata = pixels.data
    for (let i = 0; i < canvasWidth * canvasHeight; i++) {
      // 灰度滤镜
      const r = pixeldata[4 * i + 0]
      const g = pixeldata[4 * i + 1]
      const b = pixeldata[4 * i + 2]
      // const a = pixeldata[4 * i + 3]

      pixeldata[4 * i + 0] = parseInt(this.props.colorList[r][1], 10)
      pixeldata[4 * i + 1] = parseInt(this.props.colorList[g][1], 10)
      pixeldata[4 * i + 2] = parseInt(this.props.colorList[b][1], 10)
    }
    this.picCtx.putImageData(pixels, 0, 0)
  }

  render() {
    const { width: canvasWidth, height: canvasHeight } = this.props.canvasSize
    return (
      <div id="canvascon" className="canvascon" onMouseMove={this.onMousemove}>
        <canvas
          id="pic"
          className="canvas"
          width={canvasWidth}
          height={canvasHeight}
        />
      </div>
    )
  }
}
const mapStatetoProps = state => ({
  canvasSize: state.pichandler.canvasSize,
  colorList: state.curveCanvas.list
})
const mapDispatchToProps = dispatch => ({
  updateCanvasSize: (width, height) => {
    dispatch(updateCanvasSize(width, height))
  }
})
export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(Painter)
