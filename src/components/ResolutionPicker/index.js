import React, { Component } from 'react';
import { socket } from '../../utils/socket.js';
import { Link } from 'react-router';

export class ResolutionPicker extends Component {

  constructor (props) {
    super(props);
    this.state = {signat: false, mainsub: false, cosub: false};
  }

  // ComponentPassedProps or something like that...
  componentWillReceiveProps (newProps) {
    // PassProps, data is a field in props. 

    const name = decodeURIComponent(newProps.params.name);

    const data = newProps.resolutions;


  }

  selector (name, change) {

    const title = decodeURIComponent(this.props.params.name);



  }

  render() {
    const { resolutions } = this.props;
    const currentRes = resolutions[decodeURIComponent(this.props.params.name)];
    const approved = currentRes.approved;
    const requested = currentRes.requests[this.props.country];

    debugger;
    if (!approved || !requested) return (

        <div className="row">
          <div className="col-md-3">
          </div>
          <div className="col-md-3">
            <p>Request to be a signator</p>
            <button type="button" className="btn btn-primary btn-lg" onClick={() => this.selector('signat', true)} disabled={this.state.signat}>Signator</button>
          </div>
          <div className="col-md-3">
            <p>Request to be a main submittor</p>
            <button type="button" className="btn btn-primary btn-lg" onClick={() => this.selector('mainsub', true)} disabled={this.state.mainsub}>Main submittor</button>
          </div>
          <div className="col-md-3">
            <p>Request to be a co submittor</p>
            <button type="button" className="btn btn-primary btn-lg" onClick={() => this.selector('cosub', true)} disabled={this.state.cosub}>Co submittor</button>
          </div>
        </div>

    );

    if (approved) return (
      <div className="row">
        <h3>This resolution has been approved.</h3>
      </div>
    );

    if (requested) return (
      <div className="row">
        <h3>You've already submitted a request.</h3>
        <div className="col-md-3">
          <p>Revoke all requests</p>
          <button type="button" className="btn btn-danger btn-lg" onClick={() => this.selector('signat', true)} disabled={this.state.signat}>Signator</button>
        </div>
      </div>
    );

  }
}

