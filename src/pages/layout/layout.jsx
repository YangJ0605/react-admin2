import React, { Component } from 'react'
import memory from '../../utils/memory'
import { Redirect } from 'react-router-dom'

export default class Layout extends Component {
  render() {
    if(!memory.user._id) {
      return <Redirect to='/login'/>
    }
    return (
      <div>
        layout {memory.user.username}
      </div>
    )
  }
}
