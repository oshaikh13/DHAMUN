import React, { Component } from 'react';
import DocumentMeta from 'react-document-meta';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Socket } from 'components/Socket';
import { Vote } from 'containers/Vote';

import { VoteTable } from 'components/VoteTable';

import * as actionCreators from 'actions/votes';

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

export class ChairVote extends Component {

  render() {
    return (
      <Vote />
    );
  }
}