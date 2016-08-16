import React, { Component } from 'react';
import { socket } from 'utils/socket';

import { Button } from 'react-toolbox/lib/button';

/* component styles */

export class VoteDisabler extends Component {

  constructor(props) {
    super(props);
  }

  onSubmit = (event) => {
    event.preventDefault();
    const resName = decodeURIComponent(this.props.params.name);
    socket.emit("vote close", {token: this.props.token, voteName: resName});
    
  };

  render() {
    const { votes } = this.props;
    const resName = decodeURIComponent(this.props.params.name);
    const closed = votes[resName].closed;
    return (
      <div>
        <Button className="btn" onClick={(e) => this.onSubmit(e)} disabled={closed} raised primary>
          Disable
        </Button>
      </div>
    );
  }
}
