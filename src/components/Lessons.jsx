import React from 'react';
import { connect } from 'react-redux';

import AddLesson from './AddLesson';
import * as actions from '../actions';
import Lesson from './Lesson';
import '../css/Loading.css';
import '../css/MainPage.css';

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

  loadSomeLesson = (data) => {
    this.props.dispatch(actions.loadLessons(data));
  }

  render() {
    console.log('Lessons Props', this.props.lessons)
    return (
      <div className='lessons'>
        <section className='blockAdding'>
          <AddLesson onLessonAdd={this.onLessonAdd}/>
          {this.props.loading &&
            <div className="spinner">
              <div className="bounce1"></div>
              <div className="bounce2"></div>
              <div className="bounce3"></div>
            </div>
          }
        </section>
          <section>
            <div className="wrapper">
              {this.props.lessons.map(lesson => {
                return <Lesson key={lesson.id} lesson={lesson} addFile={this.addFile} loadSomeLesson={this.loadSomeLesson}/>
              })}
            </div>
        </section>
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
