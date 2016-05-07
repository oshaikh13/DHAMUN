import React, { Component } from 'react';
import DocumentMeta from 'react-document-meta';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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

@connect(
  (state) => ({
    token: state.auth.token,
    votes: state.votes.items
  }),
  dispatch => bindActionCreators(actionCreators, dispatch)
)
export class Vote extends Component {

  render() {
    return (
      <section>
        <div className="container">

          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6
                            col-md-offset-3 col-lg-offset-3">
              <h1>
                Vote in an open session
              </h1>
            </div>

            <VoteTable {...this.props} />
          </div>
        </div>
      </section>
    );
  }
}
