import React, { Component } from 'react';
import { Link } from 'react-router';
import { ResolutionTable } from 'components/ResolutionTable'

export class ResolutionTables extends Component {

  render() {
    // const { resolutions } = this.props;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h3>Approved Resolutions</h3>
            <ResolutionTable {...this.props} pending={false} />
          </div>
        </div>
        
        <div className="row">
          <div className="col-md-12">
            <h3>Pending Resolutions</h3>
            <ResolutionTable {...this.props} pending={true} />
          </div>
        </div>
      </div>
    );
  }
}

