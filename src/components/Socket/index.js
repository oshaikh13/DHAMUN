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

    let socketBound = false;

    if (this.props.votes && this.props.updateVotes) {

      console.log("ATTACHING VOTE LISTENERS");  

      socket.on("vote update", function (data) {
        console.log("updating vote store");
        this.updateVoteStore.call(this, data);
      }.bind(this));
      socket.emit("vote get", {token: this.props.token});

      socketBound = true;

    }

    if (this.props.resolutions && this.props.updateResolutions) {

      console.log("ATTACHING RESOLUTION LISTENERS");

      socket.on("resolution update", function(data){
        console.log("updating res store");
        this.updateResolutionStore.call(this, data);
      }.bind(this));
      socket.emit("resolution get", {token: this.props.token});

      socketBound = true;
      
    }


    if (!socketBound) {
      console.log("Socket not bound!");
    }


  }

  componentWillUnmount () {
    socket.removeAllListeners("vote update");
    socket.removeAllListeners("resolution update");
    console.log("REMOVING ALL LISTENERS");
  }

  render () {
    return false;
  }

}