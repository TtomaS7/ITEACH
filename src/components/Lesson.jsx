import React from 'react';
import { connect } from 'react-redux';

import '../css/Loading.css';
import '../css/ModalWindow.css';
import close from '../img/delete.svg';

import Modal from 'react-modal';
Modal.setAppElement('#root');
Modal.defaultStyles.overlay.zIndex = 1000;

const customStyles = {
  content : {
    top                        : '50%',
    left                       : '50%',
    right                      : 'auto',
    bottom                     : 'auto',
    width                      : '600px',
    height                     : 'auto',
    marginRight                : '-50%',
    transform                  : 'translate(-50%, -50%)',
    border                     : '2px solid #ccc',
    background                 : '#fff',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '4px',
    outline                    : 'none',
    padding                    : '0px',
  }
};

class Lesson extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      loading: true
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

  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    const files = this.props.lesson.files || [];
    return (
      <div>
        <div className='display-item'>
          <div>
            <p> Клас:  {this.props.lesson.className}</p>
            <p> Тема:  {this.props.lesson.topic}</p>
            <button onClick={this.openModal}>Робота з файлами</button>
          </div>
        </div>
            <Modal
              isOpen={this.state.modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              style={customStyles}
              contentLabel="Example Modal"
            >
            <div className='modalWindow'>
              <div className="head">
                <a className="btn-close trigger">
                  <img className="close" src={close} width="20" alt="close"/>
                </a>
              </div>
              <div className='content'>
                <label className="fileContainer">
                  Клікніть тут, щоб додати файли
                  <input type="file" onChange={this.onAddFile.bind(this)} ref={el => {this.file = el}}/>
                </label>
                {this.props.loading &&
                  <div className="spinner">
                    <div className="bounce1"></div>
                    <div className="bounce2"></div>
                    <div className="bounce3"></div>
                  </div>
                }
                <br/>
                {files.map((file, index) => {
                  return (

                    <div key={index} className='links'>
                      <a href={file.url}> {file.name} </a>
                    </div>
                  )
                })}
                <div className='buttonModal'>
                  <button className='buttonModal' onClick={this.closeModal} >Закрити</button>
                </div>
              </div>
            </div>
            </Modal>
      </div>
    );
  }
}


const ConnectedLessons = connect(
  (state) => {
    return {
      loading: state.app.loading,
    }
  },
  (dispatch) => {
    return {
      dispatch
    }
  }
)(Lesson)

export default ConnectedLessons;
