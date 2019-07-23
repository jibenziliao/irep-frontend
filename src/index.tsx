import React from 'react'
import ReactDOM from 'react-dom'
import { makeStore, StoreContext } from './store/Store'
import './reset.css'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

const store = makeStore()

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <section className="GlobalSection">
      <App />
    </section>
  </StoreContext.Provider>,
  document.getElementById('root')
)
serviceWorker.unregister()
