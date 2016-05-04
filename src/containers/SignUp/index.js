// Also poses as a sign in component

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { SignUpForm } from 'components/SignUpForm'

import DocumentMeta from 'react-document-meta';

import * as actionCreators from 'actions/auth';


const metaData = {
  title: 'Sign Up',
  description: 'Create your DHAMUN Account.',
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
    isAuthenticating: state.auth.isAuthenticating,
    signUpStatusText: state.auth.signUpStatusText,
    hasSignedUp: state.auth.hasSignedUp
  }),
  dispatch => bindActionCreators(actionCreators, dispatch)
)
export class SignUp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section>
        <DocumentMeta {...metaData} />
        <div className="container">

          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6
                            col-md-offset-3 col-lg-offset-3">
              <h1>
                Sign Up
              </h1>
            </div>

            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6
                            col-md-offset-3 col-lg-offset-3">
              <SignUpForm {...this.props}/>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
