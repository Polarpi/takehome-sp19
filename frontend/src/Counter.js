import React, { Component } from 'react'

class Counter extends Component {
  // YOUR CODE GOES BELOW
  state = { count: this.props.count };

  incrementCount = () => {
    this.setState({ count: this.state.count + 1 });
  }

  decrementCount = () => {
    this.setState({ count: this.state.count - 1 });
  }

  render() {
    const count = this.props
    return (
      <div>
        <h3>{this.state.count}</h3>
        <button onClick={this.incrementCount}>increment</button>
        <button onClick={this.decrementCount}>decrement</button>
      </div>
    )
  }
}

export default Counter
