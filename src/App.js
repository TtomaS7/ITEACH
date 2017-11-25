import React, { Component } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './App.css';
import Main from './Main'

/*
class TodoList extends React.Component {
  constructor(props, context) {
    super(props, context);

this.state = {
  items: []
}
    this.addItem = this.addItem.bind(this);
  }
  addItem(e){

  }
  render() {
    return (
      <div className="todoListMain">
        <div className="header">
          <form onSubmit={this.addItem}>
            <input placeholder="enter task">
            </input>
            <button type="submit">add</button>
          </form>
        </div>
      </div>
    );
  }
};

export default TodoList;

*/


class App extends Component {
  constructor(props){
    super(props)
    this.state={ test: 'test',
                events: [
                  {
                      start: '2015-07-20',
                      end: '2015-07-02',
                      eventClasses: 'optionalEvent',
                      title: 'test event',
                      description: 'This is a test description of an event',
                  },
                  {
                      start: '2015-07-19',
                      end: '2015-07-25',
                      title: 'test event',
                      description: 'This is a test description of an event',
                      data: 'you can add what ever random data you may want to use later',
                  }
                ]
              }
  }
  componetnDidUpdate(){

  }
  componentDidMount(){

  }
  render() {
    return (
      <div>
        <Main></Main>
      </div>
    );
  }
}

export default App;
