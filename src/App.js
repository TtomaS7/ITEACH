import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    BigCalendar.momentLocalizer(moment);
    this.state={ test: 'test',
                events: [
                  {
                    'title': 'All Day Event very long title',
                    'allDay': true,
                    'start': new Date(2015, 3, 0),
                    'end': new Date(2015, 3, 1)
                  },
                  {
                    'title': 'Long Event',
                    'start': new Date(2015, 3, 7),
                    'end': new Date(2015, 3, 10)
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
        <BigCalendar events={this.state.events} startAccessor='startDate' endAccessor='endDate'/>
      </div>
    );
  }
}

export default App;
