import React from 'react';

import swal from 'sweetalert2'


export default class AddLesson extends React.Component {
  constructor() {
    super();

    this.state = {
      user: null
    }
  }
  onLessonAdd = () => {
    if (!this.className.value || !this.topic.value) {
      swal(
        'Оууу...',
        'Щось пішло не так!',
        'error'
      )
     return false;
   } else {
     swal("Молодець!", "Ти додав урок)", "success")
   }
    this.props.onLessonAdd({
      className: this.className.value,
      topic: this.topic.value,
    })
  }

  render() {
    return (
      <div className='mainAdd'>
        <input className="main_input_class" ref={el => {this.className = el}} type="text" placeholder="Клас" />
        <br/>
        <input className="main_input_topic" ref={el => {this.topic = el}} type="text"  placeholder="Тема" />
        <br/>
        <button onClick={this.onLessonAdd}>Додати</button>
      </div>
    );
  }
}
