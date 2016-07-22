// Also poses as a sign in component

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { LoginForm } from 'components/LoginForm'

import DocumentMeta from 'react-document-meta';

import * as actionCreators from 'actions/auth';

/* container styles */
import { styles } from './styles/styles.scss';

const metaData = {
  title: 'Login',
  description: 'Login to your DHAMUN Account.',
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
    isAuthenticated: state.auth.isAuthenticated,
    isAuthenticating: state.auth.isAuthenticating,
    loginStatusText: state.auth.loginStatusText,
    userLevel: state.auth.userLevel,
    token: state.auth.token
  }),
  dispatch => bindActionCreators(actionCreators, dispatch)
)
export class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section>
        <DocumentMeta {...metaData} />
        <div className={styles}>
          <div className="row">
              <h1>
                Log in
              </h1>
              <LoginForm {...this.props}/>
          </div>
        </div>
      </section>
    );
  }
}

