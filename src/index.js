import React from 'react'
import ReactDom from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { LocaleProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import 'moment/locale/zh-cn'
import { Provider } from 'react-redux'
import store from './redux/store'
import Main from './router/main'

function renderWithHotReload() {
  ReactDom.render(
    <LocaleProvider locale={zhCN}>
      <AppContainer>
        <Provider store={store}>
          <Main />
        </Provider>
      </AppContainer>
    </LocaleProvider>,
    document.getElementById('app')
  )
}
/* 初始化 */
renderWithHotReload()

/* 热更新 */
if (module.hot) {
  module.hot.accept('./router/main', () => {
    renderWithHotReload()
  })
}
