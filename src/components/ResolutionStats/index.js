import React, { Component } from 'react';
import { ResolutionStatsTable } from 'components/ResolutionStatsTable'

import DocumentMeta from 'react-document-meta';

/* components */

const metaData = {
  title: 'DHAMUN',
  description: 'Get started here',
  canonical: 'http://example.com/path/to/page',
  meta: {
    charset: 'utf-8',
    name: {
      keywords: 'react,meta,document,html,tags',
    },
  },
};

export class ResolutionStats extends Component {

  render() {
    const currentRes = this.props.resolutions[decodeURIComponent(this.props.params.name)];

    return (
      <div className="row">
        <div className="col-md-3">
        </div>
        <div className="col-md-9">

          <h3>
            <a target="_blank" class="btn btn-default" href={currentRes.publicLink} role="button">View Document</a>
          </h3>
          


          <h3>Main submittors</h3>
          <ResolutionStatsTable tableElements={currentRes.mainsub} type="Main Submittor"/>

          <h3>Co submittors</h3>
          <ResolutionStatsTable tableElements={currentRes.cosub} type="Co Submittor"/>

          <h3>Signators</h3>
          <ResolutionStatsTable tableElements={currentRes.signat} type="Signator"/>

          <h3>Requests</h3>
          <ResolutionStatsTable tableElements={currentRes.requests} type="Signator"/>


        </div>
      </div>    
    );
  }
}