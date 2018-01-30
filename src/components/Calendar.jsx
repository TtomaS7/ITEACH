import React from 'react';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import { connect } from 'react-redux'

import * as actions from '../actions';
import '../css/MainPage.css';


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
        theme={{
          selectionColor: '#687F8B',
          textColor: {
            default: '#333',
            active: '#fff'
          },
          weekdayColor: '#687F8B',
          headerColor: '#496674',
          floatingNav: {
            background: '#687F8B',
            color: '#FFF',
            chevron: '#FFA726'
          }
       }}
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
