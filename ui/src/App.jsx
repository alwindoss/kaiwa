import "./App.css";

import { Component } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket("ws://127.0.0.1:8080");

class App extends Component {
  componentWillMount() {
    client.onopen = () => {
      console.log("WebSocket Client Connected");
      function sendNumber() {
        console.log("Inside sendNumber");
        console.log(client.readyState);
        if (client.readyState === client.OPEN) {
          // var number = Math.round(Math.random() * 0xffffff);
          var today = new Date("1995-12-17T03:24:00");

          console.log("Date: " + today);
          client.send(today.toString());
          setTimeout(sendNumber, 1000);
        }
      }
      sendNumber();
    };
    client.onmessage = (message) => {
      console.log(message);
    };
    // client.send = (data) => {
    //   data = "Alwin here";
    // };
    client.onmessage = (message) => {
      console.log(message);
    };
  }

  render() {
    return <div>Practical Intro To WebSockets.</div>;
  }
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
