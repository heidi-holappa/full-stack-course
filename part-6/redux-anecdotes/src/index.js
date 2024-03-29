import React from 'react'
import ReactDOM from 'react-dom/client'

import { Provider } from 'react-redux'
import App from './App'

// import anecdoteService from './services/anecdotes'
import store from './reducers/store'
// import { setAnecdotes } from './reducers/anecdoteReducer'

// anecdoteService.getAll().then(notes =>
//   store.dispatch(setAnecdotes(notes))
// )

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
