import React, { Component } from 'react';
import { socket } from '../../utils/socket.js';
import { Link } from 'react-router';

export class VotePicker extends Component {

  constructor (props) {
    super(props);
    this.state = {pass: false, abstain: false, reject: false};
  }

  // ComponentPassedProps or something like that...
  componentWillReceiveProps (newProps) {
    // PassProps, data is a field in props. 

    const name = decodeURIComponent(newProps.params.name);

    const data = newProps.votes;

    if (data[name] && data[name].votes[this.props.country] && !this.state[data[name].votes[this.props.country].type]) {
      this.selector(data[name].votes[this.props.country].type);
    }

  }

  selector (name, change) {

    const title = decodeURIComponent(this.props.params.name);

    if (name === "pass") {
      this.setState({pass: true, abstain: false, reject: false})
    } else if (name === "abstain") {
      this.setState({pass: false, abstain: true, reject: false})
    } else if (name === "reject") {
      this.setState({pass: false, abstain: false, reject: true});
    }

    if (change) {
      socket.emit("vote add", {token: this.props.token, type: name, title: title});
    }

  }

  render() {
    const { votes } = this.props;
    const closed = votes[decodeURIComponent(this.props.params.name)].closed;

    if (!closed) return (
      <div className="btn-group" role="group">
        <button type="button" className="btn btn-primary btn-lg" onClick={() => this.selector('pass', true)} disabled={this.state.pass}>Pass</button>
        <button type="button" className="btn btn-default btn-lg" onClick={() => this.selector('abstain', true)} disabled={this.state.abstain}>Abstain</button>
        <button type="button" className="btn btn-danger btn-lg" onClick={() => this.selector('reject', true)} disabled={this.state.reject}>Reject</button>
      </div> 
    );

    return (
      <h3>Voting session is closed</h3>
    );
  }
}


