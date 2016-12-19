import React, { Component } from 'react';
import DocumentMeta from 'react-document-meta';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Socket } from 'components/Socket';
import { VoteAddForm } from 'components/VoteAddForm';

import { VoteTable } from 'components/VoteTable';
import { VoteRequestTable } from 'components/VoteRequestTable';


import * as actionCreators from 'actions/votes';

/* material UI components */
import { Card } from 'react-toolbox/lib/card';

/* container styles */
import { styles } from './styles/styles.scss';

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
    userLevel: state.auth.userLevel,
    votes: state.votes.items,
    resolutions: state.resolutions.items
  }),
  dispatch => bindActionCreators(actionCreators, dispatch)
)
export class Vote extends Component {

  // TODO: Add component that filters certain resolutions

  render() {
    return (
      <section className={styles}>
        <Socket {...this.props} />
        <div className="container">


          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6
                            col-md-offset-3 col-lg-offset-3">
              <h1>
                Vote in an open session
              </h1>
            </div>

            <Card className="card">
              <VoteTable {...this.props} />

                { this.props.userLevel === "Chair" &&
                  <VoteAddForm {...this.props} />
                } 



            </Card>
          </div>
        </div>
      </section>
    );
  }
}
