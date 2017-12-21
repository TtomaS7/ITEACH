import React from 'react';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import { connect } from 'react-redux'

import * as actions from '../actions';

class Calendar extends React.Component {

  onUserDateSelect = date => {
    this.props.dispatch(actions.selectDate(date.toDateString()))
    this.props.dispatch(actions.loadLessons(date.toDateString()))
  }

  render() {
    return (
      <InfiniteCalendar
        width={400}
        height={window.innerHeight}
        onSelect={this.onUserDateSelect}
      />
    );
  }
}

const MappedCallendar = connect(
  (state) => {
    return {}
  },
  (dispatch) => {
    return {
      dispatch: dispatch
    }
  }
)(Calendar);

export default MappedCallendar;
