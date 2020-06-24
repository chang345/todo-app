import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './counter.css';

class Counter extends Component {

  constructor() {
    super()
    this.state = {
      counter: 0
    }
    //this.increment = this.increment.bind(this)
  }

  render() {
    return (
      <div className="Counter">
        <CounterButton by={1} incrementMethod={this.increment} decrementMethod={this.decrement}></CounterButton>
        <CounterButton by={5} incrementMethod={this.increment} decrementMethod={this.decrement}></CounterButton>
        <CounterButton by={10} incrementMethod={this.increment} decrementMethod={this.decrement}></CounterButton>
        <span className="count">{this.state.counter}</span>
        <div><button className="reset" onClick={this.reset}>Reset</button></div>
      </div>
    );
  }

  increment= (by) => {
    this.setState(
      (prevState) => {
        return { counter: prevState.counter + by }
      }
    )
  }

  decrement= (by) => {
    this.setState(
      (prevState) => {
        return { counter: prevState.counter - by }
      }
    )
  }

  reset = () => {
    this.setState({counter: 0})
  }
}

class CounterButton extends Component {

  render() {
    return (
      <div className="counter">
        <button onClick={() => {this.props.incrementMethod(this.props.by)}}>+{this.props.by}</button>
        <button onClick={() => {this.props.decrementMethod(this.props.by)}}>-{this.props.by}</button>
      </div>
    );
  }

}

// default props
CounterButton.defaultProps = {
  by: 1
}

// set properties type 
CounterButton.propTypes = {
  by: PropTypes.number
}

export default Counter