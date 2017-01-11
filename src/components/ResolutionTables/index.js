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
            <h3>Approved {this.props.dataType}</h3>
            <ResolutionTable {...this.props} pending={false} />
          </div>
        </div>
        
        <div className="row">
          <div className="col-md-12">
            <h3>Pending {this.props.dataType}</h3>
            <ResolutionTable {...this.props} pending={true} />
          </div>
        </div>
      </div>
    );
  }
}

