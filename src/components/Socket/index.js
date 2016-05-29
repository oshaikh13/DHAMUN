import React, { Component } from 'react';
import { socket } from '../../utils/socket.js';
import { Link } from 'react-router';

export class Socket extends Component {

  updateVoteStore (data) {
    this.props.updateVotes(data, this.props.votes);
  }

  updateResolutionStore (data) {
    this.props.updateResolutions(data, this.props.resolutions);
  }

  componentDidMount () {
    if (this.props.votes && this.props.updateVotes) {

      console.log("ATTACHING VOTE LISTENERS");  

      socket.on("vote update", function (data) {
        this.updateVoteStore.call(this, data);
      }.bind(this));
      socket.emit("vote get", {token: this.props.token});

    }

    if (this.props.resolutions && this.props.updateResolutions) {

      console.log("ATTACHING RESOLUTION LISTENERS");

      socket.on("resolution update", function(data){
        this.updateResolutionStore.call(this, data);
      }.bind(this));
      socket.emit("resolution get", {token: this.props.token});
      
    }


  }

  componentWillUnmount () {
    socket.removeAllListeners("vote update");
    socket.removeAllListeners("resolution update");
  }

  render () {
    return false;
  }

}