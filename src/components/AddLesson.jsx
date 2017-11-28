import React from 'react';

import swal from 'sweetalert'
import  '../css/App_s.css'

export default class AddLesson extends React.Component {
  onLessonAdd = () => {
    if (!this.className.value || !this.topic.value) {
      swal("Oops...", "Something went wrong! Please, add class or topic.", "error");
     return false;
   } else {
     swal("Good job!", "You addedsomething!", "success")
   }
    this.props.onLessonAdd({
      className: this.className.value,
      topic: this.topic.value,
    })
  }

  render() {
    return (
      <div>
        <input className="main_input_class" ref={el => {this.className = el}} type="text" placeholder="Класс" />
        <br/>
        <input className="main_input_topic" ref={el => {this.topic = el}} type="text"  placeholder="Тема" />
        <br/>
        <button onClick={this.onLessonAdd}>Добавить</button>
      </div>
    );
  }
}
