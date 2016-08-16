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
    const { currentRes } = this.props;

    const passedProps = {
      name: this.props.name,
      token: this.props.token,
      country: this.props.country,
      isCreator: this.props.country === currentRes.original,
      approved: currentRes.approved
    }

    return (
      <div className="row">

          <h3 className="centerText">
            <a target="_blank" href={currentRes.publicLink} role="button">View Document</a>
          </h3>
          
          <div className="container limit">
            <h3>Main submittors</h3>
            <ResolutionStatsTable tableElements={currentRes.mainsub} {...passedProps} type="mainsub"/>

            <h3>Co submittors</h3>
            <ResolutionStatsTable tableElements={currentRes.cosub} {...passedProps} type="cosub"/>

            <h3>Signators</h3>
            <ResolutionStatsTable tableElements={currentRes.signat} {...passedProps} type="signat"/>

            <h3>Requests</h3>
            <ResolutionStatsTable tableElements={currentRes.requests} {...passedProps} type="requests"/>
          </div>

      </div>    
    );
  }
}