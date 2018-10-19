import React, { Component } from 'react'
import MenuBar from '../../component/menubar'
import MainPage from './components/mainpage'

export default class PicHandler extends Component {
  constructor(props) {
    super(props)
    this.state = null
  }

  render() {
    return (
      <div>
        <MenuBar />
        <MainPage />
      </div>
    )
  }
}
