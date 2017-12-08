import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class Lesson extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  onAddFile = () => {
    this.props.addFile({
      file: this.file.files[0],
      ...this.props.lesson,
    })
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }
  
  render() {
    const files = this.props.lesson.files || [];
    return (
      <div>
        {this.props.lesson.className} : {this.props.lesson.topic}
        <br/>
          <div>
            <button onClick={this.openModal}>Open Modal</button>
            <Modal
              isOpen={this.state.modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2>
              <input type="file" onChange={this.onAddFile.bind(this)} ref={el => {this.file = el}}/>
              {files.map((file, index) => {
                return (
                  <div key={index}>
                    <a href={file.url}> {file.name} </a>
                  </div>
                )
              })}
              <button onClick={this.closeModal} >close</button>
              <div>I am a modal</div>
            </Modal>
          </div>
        <hr/>
      </div>
    );
  }
}

export default Lesson;
