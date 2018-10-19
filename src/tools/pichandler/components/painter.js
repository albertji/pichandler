import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../assets/css/main.css'
import {
  updateCanvasSize,
  updatePosition
} from '../../../redux/actions/action_pichandler'
import imgUrl from '../assets/img/bg.jpg'

class Painter extends Component {
  constructor(props) {
    super(props)
    this.state = null
    this.picCanvas = null
    this.picCtx = null
    this.colorList = []
    this.img = null

    this.canvasLeft = 0
    this.canvasTop = 0
  }

  componentDidMount() {
    window.addEventListener('resize', this.onWindowResize)
    const canvasWidth = document.getElementById('canvascon').offsetWidth
    const canvasHeight = document.getElementById('canvascon').offsetHeight
    this.canvasLeft = document.getElementById('mainpage').offsetLeft + 20
    this.canvasTop = document.getElementById('mainpage').offsetTop + 20
    this.props.updateCanvasSize(canvasWidth, canvasHeight)
    this.initColorList()
    this.initImg()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize)
  }

  onMousedown = () => {}

  onMousemove = async event => {
    const eventLeft = event.clientX
    const eventTop = event.clientY
    const offsetX = eventLeft - this.canvasLeft
    const offsetY = eventTop - this.canvasTop
    await this.props.updatePosition(offsetX, offsetY)
    this.resetData()
  }

  initColorList = () => {
    for (let i = 0; i <= 255; i++) {
      this.colorList.push([i, i])
    }
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
    this.drawBoxes()
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

      pixeldata[4 * i + 0] = parseInt(this.colorList[r][1], 10)
      pixeldata[4 * i + 1] = parseInt(this.colorList[g][1], 10)
      pixeldata[4 * i + 2] = parseInt(this.colorList[b][1], 10)
    }
    this.picCtx.putImageData(pixels, 0, 0)
  }

  drawBoxes = () => {
    const { boxes } = this.props.canvasData
    boxes.map(box => {
      this.drawSingleBox(box)
      return false
    })
  }

  drawSingleBox = box => {
    const { rect } = box
    const width = rect[2] - rect[0]
    const height = rect[3] - rect[1]
    this.picCtx.beginPath()
    // console.log(this.picCtx)
    this.picCtx.lineWidth = 1
    this.picCtx.fillStyle = '#fff'
    this.picCtx.strokeStyle = '#ff0000'
    this.picCtx.rect(rect[0], rect[1], width, height)
    this.picCtx.stroke()
    // this.picCtx.fill()
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
  canvasData: state.pichandler.canvasData
})
const mapDispatchToProps = dispatch => ({
  updateCanvasSize: (width, height) => {
    dispatch(updateCanvasSize(width, height))
  },
  updatePosition: (x, y) => {
    dispatch(updatePosition(x, y))
  }
})
export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(Painter)
