import React from 'react'
import {Button, message} from 'antd'

class App extends React.Component {
  handleClick = () => {
    console.log(111)
    message.success('success')
  }
  render() {
    return <div>App<Button type='primary' onClick = {this.handleClick}>button</Button></div>
  }
}

export default App