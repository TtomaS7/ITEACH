import React, { Component } from 'react';
import firebase from './firebase.js';
import './App_s.css';

class App_s extends Component {
  constructor() {
    super();
    this.state = {
      klas: '',
      tema: '',
      items: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
  const itemsRef = firebase.database().ref('items');
  itemsRef.on('value', (snapshot) => {
    let items = snapshot.val();
    let newState = [];
    for (let item in items) {
      newState.push({
        id: item,
        main_tema: items[item].main_tema,
        main_title: items[item].main_title
      });
    }
    this.setState({
      items: newState
    });
  });
}
  handleSubmit(e) {
    e.preventDefault();
    const itemsRef = firebase.database().ref('items');
    const item = {
      main_tema: this.state.tema,
      main_title: this.state.klas
    }
    itemsRef.push(item);
    this.setState({
      tema: '',
      klas: ''
    });
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log(e.target.value)

  }
  removeItem(itemId) {
  const itemRef = firebase.database().ref(`/items/${itemId}`);
  itemRef.remove();
  }
  render() {
    return (
      <div className='app'>
        <header>
            <div className='wrapper'>
              <h1>Добавить класс и тему</h1>

            </div>
        </header>
        <div className='container'>
        <section className="add-item">
        <form onSubmit={this.handleSubmit}>
          <input type="number" name="klas" placeholder="Класс" onChange={this.handleChange} value={this.state.klas} />
          <input type="text" name="tema" placeholder="Тема" onChange={this.handleChange} value={this.state.tema} />
          <button>Добавить</button>
        </form>
        </section>
        <section className='display-item'>
          <div className="wrapper">
            <ul>
              {this.state.items.map((item) => {
                return (
                  <li key={item.id}>
                    <h3>{item.main_title} класс</h3>
                    <p>Тема: {item.main_tema}
                    <div className='but'>
                      <button onClick={() => this.removeItem(item.id)}>Удалить</button>
                      <button >Добавить файлы</button>
                    </div>
                    </p>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>
        </div>
      </div>
    );
  }
}
export default App_s;
