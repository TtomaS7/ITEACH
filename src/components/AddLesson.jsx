import React from 'react';

export default class AddLesson extends React.Component {
  onLessonAdd = () => {
    this.props.onLessonAdd({
      className: this.className.value,
      topic: this.topic.value,
    })
  }

  render() {
    return (
      <div>
        <input ref={el => {this.className = el}} type="text" placeholder="Класс" />
        <br/>
        <input ref={el => {this.topic = el}} type="text"  placeholder="Тема" />
        <br/>
        <button onClick={this.onLessonAdd}>Добавить</button>
      </div>
    );
  }
}
