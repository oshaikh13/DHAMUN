import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { reset } from 'redux-form';

/* component styles */
import { styles } from './styles.scss';

export class AuthForm extends Component {
  static propTypes = {
    dispatch: React.PropTypes.func,
    fields: React.PropTypes.object.isRequired,
    isLogin: React.PropTypes.boolean
  };

  constructor(props) {
    super(props);
  }

  onSubmit = (event) => {
    if (this.props.fields.username.value && this.props.fields.password.value) {
      /* add item*/
      // this.props.addItem(this.props.fields);
      if (this.props.isLogin) {
        // Dispatch a login event

      } else {
        // Dispatch a sign in event
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
          <button className="btn btn-default" onClick={this.onSubmit} >
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
