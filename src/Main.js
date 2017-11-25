import React, { Component } from 'react';
import TodoList from './TodoList';
import Calendar from 'rc-calendar';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showWarning: true}
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }
  handleToggleClick() {
    console.log(this.element)
    this.setState(prevState => ({
      showWarning: !prevState.showWarning
    }));
    if(this.element.display == 'none'){
      this.element.display = 'block'
    }else{
      this.element.display = 'none'
    }
  }
  componentDidMount(){
    this.element = document.getElementsByClassName('todoListMain')[0].style
    this.element.display = 'none'
  }

  render() {
    return (
      <div>
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? 'Add class' : 'Hide'}
        </button>
        <TodoList/>
      </div>
    );
  }
}
export default Main;
