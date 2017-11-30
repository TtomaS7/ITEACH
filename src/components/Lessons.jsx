import React from 'react';
import { connect } from 'react-redux';
import AddLesson from './AddLesson';
import * as actions from '../actions';
import Lesson from './Lesson';

class Lessons extends React.Component {
  onLessonAdd = (data) => {
    this.props.dispatch(actions.addLesson({
      ...data,
      date: this.props.selectedDate,
    }))
  }

  addFile = (data) => {
    this.props.dispatch(actions.addFileToLesson(data));
  }
  didComponentUpdate(){

  }
  loadSomeLesson = (data) => {
    this.props.dispatch(actions.loadLessons(data));
  }
  render() {
    return (
      <div>
        <AddLesson onLessonAdd={this.onLessonAdd}/>
        {this.props.loading && "Loading 3...2...1..." }
        {this.props.lessons.map(lesson => {
          return <Lesson key={lesson.id} lesson={lesson} addFile={this.addFile} loadSomeLesson={this.loadSomeLesson}/>
        })}
      </div>
    );
  }
}

const ConnectedLessons = connect(
  (state) => {
    return {
      selectedDate: state.app.selectedDate,
      lessons: state.app.lessons[state.app.selectedDate] || [],
      loading: state.app.loading,
    }
  },
  (dispatch) => {
    return {
      dispatch
    }
  }
)(Lessons)

export default ConnectedLessons;
