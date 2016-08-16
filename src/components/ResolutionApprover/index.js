import React, { Component } from 'react';
import { socket } from 'utils/socket';

import { Button } from 'react-toolbox/lib/button';

/* component styles */

export class ResolutionApprover extends Component {

  constructor(props) {
    super(props);
  }

  onSubmit = (event) => {
    event.preventDefault();
    const resName = decodeURIComponent(this.props.params.name);
    socket.emit("resolution approve", {token: this.props.token, name: resName});
    
  };

  render() {
    const { currentRes } = this.props;
    const resName = decodeURIComponent(this.props.params.name);
    const approved = currentRes.approved
    return (
      <div className="text-center">
        <Button className="btn" onClick={(e) => this.onSubmit(e)} disabled={approved} raised primary>
          Approve Resolution
        </Button>
      </div>
    );
  }
}
