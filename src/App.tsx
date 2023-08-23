import React from "react";
import "./App.scss";
import { Clock } from "./components/Clock";

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

export class App extends React.Component {
  today = new Date();
  state = {
    clockName: "Clock-0",
    thereClock: true,
  };
  timerId = 0;

  handleClick = () => {
    this.setState({
      thereClock: true,
    });
  };

  handleContextMenu = (event: MouseEvent) => {
    event.preventDefault();

    this.setState({
      hasClock: false,
    });
  };

  componentDidMount(): void {
    document.addEventListener("click", this.handleClick);
    document.addEventListener("contextmenu", this.handleContextMenu);
    // This code starts a timer
    this.timerId = window.setInterval(() => {
      this.setState({
        clockName: getRandomName(),
      });
    }, 3300);
  }

  componentWillUnmount(): void {
    document.removeEventListener("click", this.handleClick);
    document.removeEventListener("contextmenu", this.handleContextMenu);
    // this code stops the timer
    window.clearInterval(this.timerId);
  }

  render() {
    return (
      <div className="App">
        <h1>React clock</h1>

        {this.state.thereClock && <Clock clockName={this.state.clockName} />}
      </div>
    );
  }
}
