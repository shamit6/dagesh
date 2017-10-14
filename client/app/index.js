import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import 'semantic-ui-css/semantic.min.css'
import './style.css'

import { AppContainer } from 'react-hot-loader'

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      {Component}
    </AppContainer>,
    document.getElementById('app')
  )
}

render(<App/>);

if (module.hot) {
  //module.hot.accept()
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default
    render(<NextApp/>)
  })
}
