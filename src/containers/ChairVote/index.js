import React, { Component } from 'react';
import DocumentMeta from 'react-document-meta';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Socket } from 'components/Socket';
import { Vote } from 'containers/Vote';

import { VoteTable } from 'components/VoteTable';

import * as actionCreators from 'actions/votes';

export class ChairVote extends Component {

  render() {
    return (
      <Vote />

    );
  }
}