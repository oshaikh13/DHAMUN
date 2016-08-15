import React, { Component } from 'react';
import DocumentMeta from 'react-document-meta';

/* components */
import { ResolutionSubmit } from 'components/ResolutionSubmit';
import { ResolutionTables } from 'components/ResolutionTables';

import * as actionCreators from 'actions/resolutions';

import { Socket } from 'components/Socket';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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
    resolutions: state.resolutions.items,
    admins: state.auth.admins,
    country: state.auth.country
  }),
  dispatch => bindActionCreators(actionCreators, dispatch)
)
export class Resolutions extends Component {
  render() {
    return (
      <section className={styles}>
        <Socket {...this.props} />
        <div className="container">

          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6
                            col-md-offset-3 col-lg-offset-3">
              <h1>
                View Resolutions
              </h1>
            </div>

            <Card className="card">
              <div className="col-lg-6">
              <ResolutionTables {...this.props}/>
              
              <ResolutionSubmit {...this.props}/>
              </div>
            </Card>

          </div>
        </div>
      </section>
    );
  }
}
