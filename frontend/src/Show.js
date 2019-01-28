import React, { Component } from 'react'
import Counter from './Counter'

class App extends Component {
  // YOUR CODE GOES BELOW
  state = { id: this.props.id, name: this.props.name, episodes_seen: this.props.episodes_seen }

  render() {
    const { id, name, episodes_seen } = this.props
    return (
      <div>
        <h1>{this.state.name}</h1>
        <Counter count={this.state.episodes_seen} />
      </div>
    )
  }
}

export default App
