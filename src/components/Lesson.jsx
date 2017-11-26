import React from 'react';
import { connect } from 'react-redux';

class Lesson extends React.Component {

  onAddFile = () => {
    this.props.addFile({
      file: this.file.files[0],
      ...this.props.lesson,
    })
  }

  render() {
    const files = this.props.lesson.files || [];
    return (
      <div>
        {this.props.lesson.className} : {this.props.lesson.topic}
        <br/>
        <input type="file" onChange={this.onAddFile.bind(this)} ref={el => {this.file = el}}/>
        {files.map(file => {
          return (
            <div>
              <a href={file.url}> {file.name} </a>
            </div>
          )
        })}
        <hr/>
      </div>
    );
  }
}

export default Lesson;
