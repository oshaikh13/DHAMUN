import React, { Component } from 'react';
import { socket } from '../../utils/socket.js';
import { Link } from 'react-router';

export class Socket extends Component {

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

  render () {
    return false;
  }

}