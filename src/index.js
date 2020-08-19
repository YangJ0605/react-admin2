import React from 'react'
import ReactDOM from 'react-dom'
import storage from './utils/storageUtils'
import memory from './utils/memory'

import App from './App'

memory.user = storage.get('current_user')

const root = document.getElementById('root')
ReactDOM.render(<App/>, root)