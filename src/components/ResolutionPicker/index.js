import React, { Component } from 'react';
import { socket } from '../../utils/socket.js';
import { Link } from 'react-router';

/* component styles */
import { styles } from './styles.scss';

/* material UI components */
import Button from 'react-toolbox/lib/button';
import Tooltip from 'react-toolbox/lib/tooltip';

const TooltipButton = Tooltip(Button);

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

    if (data[name] && data[name].requests[newProps.country].type && !this.state[data[name].requests[newProps.country].type]) {
      this.selector(data[name].requests[newProps.country].type);
    }

  }

  selector (name, change) {

    const title = decodeURIComponent(this.props.params.name);

    // TODO create the hash and set props to true/false, then set state with hash.
    // Cleaner. too lazy rn
    if (name === "signat") {
      this.setState({signat: true, mainsub: false, cosub: false})
    } else if (name === "mainsub") {
      this.setState({signat: false, mainsub: true, cosub: false})
    } else if (name === "cosub") {
      this.setState({signat: false, mainsub: false, cosub: true});
    } else if (name === "revoke") {
      this.setState({signat: false, mainsub: false, cosub: false});
    }

    if (change) {
      if (name === "revoke") {
        socket.emit("resolution sign revoke", {token: this.props.token, name: title})
      } else socket.emit("resolution sign request", {token: this.props.token, signType: name, name: title});
    }

  }

  render() {
    const { currentRes } = this.props;
    // const currentRes = resolutions[decodeURIComponent(this.props.params.name)];
    const approved = currentRes.approved;
    const requested = currentRes.requests[this.props.country];

    if (this.props.country === currentRes.original) {
      return (
        <div className={styles}>
          <h3>You cannot vote on your own resolution</h3>
        </div>
      )
    }

    if (approved) return (
      <div className={styles}>
        <h3>This resolution has been approved.</h3>
      </div>
    );

    return (
      <div className={styles}>
        <div className="buttons">
          <div>
            <TooltipButton label='Signator' tooltip='Request to be a signator' type="button" className="btn" onClick={() => this.selector('signat', true)} disabled={this.state.signat} raised primary/>
          </div>
          <div>
            <TooltipButton label="Main submittor" tooltip="Request to be a main submittor" type="button" className="btn" onClick={() => this.selector('mainsub', true)} disabled={this.state.mainsub}raised primary/>
          </div>
          <div>
            <TooltipButton label="Co submittor" tooltip="Request to be a co submittor" type="button" className="btn" onClick={() => this.selector('cosub', true)} disabled={this.state.cosub}raised primary/>
          </div>
        </div>

        <br/>

        <div className="buttons">
            <TooltipButton label="Revoke" tooltip="Revoke all requests" type="button" className="btn danger" style={{background : "#f44336"}} onClick={() => this.selector('revoke', true)} primary raised/>
        </div>
      </div>
    );


  }
}

