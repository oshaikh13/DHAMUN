import React, { Component } from 'react';
import { socket } from '../../utils/socket.js';
import { Link } from 'react-router';

export class VotePicker extends Component {

  updateVoteStore (data) {
    this.props.updateVotes(data, this.props.votes);
  }

  componentDidMount () {
    socket.on("vote update", function (data) {
      this.updateVoteStore.call(this, data);
    }.bind(this));

    socket.emit("vote get", {token: this.props.token})
  }

  componentWillUnmount () {
    socket.removeAllListeners("vote update");
  }

  render() {
    const { votes } = this.props;
    return (
      <div className="btn-group" role="group">
        <button type="button" className="btn btn-primary btn-lg">Pass</button>
        <button type="button" className="btn btn-default btn-lg">Abstain</button>
        <button type="button" className="btn btn-danger btn-lg">Reject</button>
      </div>
    );
  }
}