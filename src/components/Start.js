import React, { Component } from "react";

class Start extends Component {
  onSubmit = event => {
    const mode = {
      mode: 'PLAY',
      isEven: +event.target.first.value,
    };

    event.preventDefault();

    this.props.setMode(mode);
    !mode.isEven && this.props.getNextMove([]);
  }

  render() {
    return (
      <div>
        <h1>Welcome to 9DT</h1>
        <form onSubmit={this.onSubmit}>
          <div>
            Who's first?
            <input type="radio" name="first" value="1" id="user" defaultChecked />
            <label htmlFor="user">Player</label>
            <input type="radio" name="first" value="0" id="pc" />
            <label htmlFor="pc">PC</label>
          </div>
          <div>
            <button type="submit">
              Start
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Start;