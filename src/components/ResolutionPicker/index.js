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

    const isAffiliated = (
      data[name].mainsub[newProps.country] || 
      data[name].cosub[newProps.country] || 
      data[name].signat[newProps.country] 
    )

    if (data[name] && data[name].requests[newProps.country]) {
      this.selector(data[name].requests[newProps.country].type);

    } else if (data[name] && !data[name].requests[newProps.country] && !isAffiliated) {
      this.selector('ENABLED'); // all buttons should be enabled
    } else if (data[name] && isAffiliated) {

      this.selector('DISABLED'); // all buttons should be disabled
    }


  }


  // Probs make this a util or a mixin
  onlyCountry (countryName, resolution) {
    var mainsubKeys = Object.keys(resolution.mainsub).length;
    var cosubKeys = Object.keys(resolution.cosub).length;

    // No one cares about requests
    if (resolution.requests[countryName]) return false;

    // You are a mainsubmittor, the only one, and there is no cosubmittor
    if (resolution.mainsub[countryName] && mainsubKeys === 1 && cosubKeys === 0) return true;

    // You are a cosubmittor, the only one, and there is no mainsubmittor
    if (resolution.cosub[countryName] && cosubKeys === 1 && mainsubKeys === 0) return true;

    return false;
  }

  selector (name, change) {

    const title = decodeURIComponent(this.props.params.name);

    const onlyCountry = this.onlyCountry(this.props.country, this.props.currentRes);
    if (onlyCountry && name === "revoke") {
      alert("This resolution is now dead -- empty");
    }

    // TODO create the hash and set props to true/false, then set state with hash.
    // Cleaner. too lazy rn
    var newState = {
      signat: name === "signat",
      mainsub: name === "mainsub",
      cosub: name === "cosub"
    }

    if (name === 'ENABLED') {
      newState = {signat: false, mainsub: false, cosub: false};
    } else if (name === 'DISABLED') {
      newState = {signat: true, mainsub: true, cosub: true};
    }

    this.setState(newState);
    
    if (change) {
      if (name === "revoke") {
        // check if you're a mainsub / cosub

        socket.emit("resolution sign revoke", {token: this.props.token, name: title})
      } else socket.emit("resolution sign request", {token: this.props.token, signType: name, name: title});
    }

  }

  render() {
    const { currentRes } = this.props;
    // const currentRes = resolutions[decodeURIComponent(this.props.params.name)];
    const approved = currentRes.approved;
    const requested = currentRes.requests[this.props.country];

    if (approved) return (
      <div className={styles}>
        <h3>This document has been approved.</h3>
      </div>
    );

    return (
      <div className={styles}>
        <div className="buttons res-input">
          <div>
            <TooltipButton label='Signatory' tooltip='Request to be a signatory' type="button" className="btn" onClick={() => this.selector('signat', true)} disabled={this.state.signat} raised primary/>
          </div>
          <div>
            <TooltipButton label="Co submittor" tooltip="Request to be a co submittor" type="button" className="btn" onClick={() => this.selector('cosub', true)} disabled={this.state.cosub}raised primary/>
          </div>
          <div>
            <TooltipButton label="Main submittor" tooltip="Request to be a main submittor" type="button" className="btn" onClick={() => this.selector('mainsub', true)} disabled={this.state.mainsub}raised primary/>
          </div>
        </div>

        <br/>

        <div className="buttons">
          <TooltipButton label="Leave" tooltip="Leave this group" type="button" className="btn danger" style={{background : "#f44336"}} onClick={() => this.selector('revoke', true)} primary raised/>
        </div>
      </div>
    );


  }
}

