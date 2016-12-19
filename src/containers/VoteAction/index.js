import React, { Component } from 'react';
import DocumentMeta from 'react-document-meta';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Socket } from 'components/Socket';
import { VotePicker } from 'components/VotePicker';
import { VoteChart } from 'components/VoteChart';
import { VoteDisabler } from 'components/VoteDisabler';

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
    votes: state.votes.items,
    country: state.auth.country,
    userLevel: state.auth.userLevel
  }),
  dispatch => bindActionCreators(actionCreators, dispatch)
)
export class VoteAction extends Component {

  render() {
    return (
      <section className={styles}>
        <Socket {...this.props} />
        <div className="container">
          <Card className="card">
            { this.props.userLevel === "Delegate" &&
              <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6
                                col-md-offset-3 col-lg-offset-3">
                  <h1>
                    Vote for {this.props.params.name}
                  </h1>
                  <VotePicker {...this.props} />
                </div>

              </div>   
            }

            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6
                              col-md-offset-3 col-lg-offset-3">
                <h1 style={{"margin-top": 0}}>
                  Stats for {this.props.params.name}
                </h1>

                <VoteChart {...this.props} />

                { this.props.userLevel === "Chair" &&
                  <VoteDisabler {...this.props} />
                } 

              </div>

            </div>
          </Card>
        </div>
      </section>
    );
  }
}
