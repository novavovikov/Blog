import React from 'react'
import * as ReactDOM from 'react-dom'
import Editor from './Editor'

const rootEl = document.getElementById('editor')

ReactDOM.render(
  <Editor/>,
  rootEl,
)

// Hot Module Replacement
declare let module: { hot: any }

if (module.hot) {
  module.hot.accept('./Editor', () => {
    const HotEditor = require('./Editor')

    ReactDOM.render(
      <HotEditor/>,
      rootEl,
    )
  })
}