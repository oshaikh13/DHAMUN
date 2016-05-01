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
    if (this.props.fields.DHAMUNCode.value) {
      /* add item*/

      const usr = {
        hashCode: this.props.fields.DHAMUNCode.value
      }

      this.props.signIn(usr);

      /* reset form */
      this.props.dispatch(reset('authForm'));
    }
    event.preventDefault();
  };

  render() {
    const {
      fields: { DHAMUNCode },
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
            placeholder="DHAMUN Code"
            {...DHAMUNCode}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-default" onClick={(e) => this.onSubmit(e)} disabled={this.props.isAuthenticating} >
            Login
          </button>
        </div>
      </form>
    );
  }
}

AuthForm = reduxForm({
  form: 'authForm',
  fields: ['DHAMUNCode'],
  destroyOnUnmount: false,
})(AuthForm);

export default AuthForm;
