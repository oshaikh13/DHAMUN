import React, { Component } from 'react';
import DocumentMeta from 'react-document-meta';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from 'actions/auth';

const metaData = {
  title: 'Logging out',
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
  (state) => ({}),
  dispatch => bindActionCreators(actionCreators, dispatch)
)

export class Logout extends Component {

  constructor (props) {
    super(props);
  }

  render () {
    this.props.logOut();
    return (
      <section>
        <DocumentMeta {...metaData} />
        <div className="container">

          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6
                            col-md-offset-3 col-lg-offset-3">
              <h1>
                Logging Out
              </h1>
            </div>
          </div>
        </div>
      </section>
    )
  }

}


