import React, { Component } from 'react';
import './App.css';
import './bootstrap.css';
import TodoApp from './components/todo/TodoApp'

class App extends Component {
  render() {
    return (
      <div className="App">
        <TodoApp/>
        
      </div>
    );
  }
}

// class LearningComponents extends Component {
//   render() {
//     return (
//       <div className="App">
//         My Hello World
//         <FirstComponent />
//         <SecondComponent />
//         <ThirdComponent />
//       </div>
//     );
//   }
// }

export default App;
