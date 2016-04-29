import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { reset } from 'redux-form';
import { Link } from 'react-router';

/* component styles */
import { styles } from './styles.scss';

// Do not render this if logged in. 
// Instead show a link to the dashboard (yay)

export class AuthForm extends Component {
  static propTypes = {
    dispatch: React.PropTypes.func,
    fields: React.PropTypes.object.isRequired,
    isLogin: React.PropTypes.bool,
    signUp: React.PropTypes.func,
    signIn: React.PropTypes.func
  };

  constructor(props) {
    super(props);
  }

  onSubmit = (event) => {
    if (this.props.fields.username.value && this.props.fields.password.value) {
      /* add item*/

      const usr = {
        username: this.props.fields.username.value,
        password: this.props.fields.password.value
      }

      if (this.props.isLogin) {
        this.props.signIn(usr);
      } else {
        this.props.signUp(usr);
      }

      /* reset form */
      this.props.dispatch(reset('authForm'));
    }
    event.preventDefault();
  };

  render() {
    const {
      fields: { username, password },
    } = this.props;

    if (this.props.isAuthenticated) {
      return (
        <h3>You're logged in. Go to the <Link to='/dashboard'>dashboard</Link></h3>
      );
    }


    return (
      <form className={styles} onSubmit={this.onAdd}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            {...username}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            {...password}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-default" onClick={(e) => this.onSubmit(e)} disabled={this.props.isAuthenticating} >
            {this.props.isLogin ? "Login" : "Sign Up"}
          </button>
        </div>
      </form>
    );
  }
}

AuthForm = reduxForm({
  form: 'authForm',
  fields: ['username', 'password'],
  destroyOnUnmount: false,
})(AuthForm);

export default AuthForm;
