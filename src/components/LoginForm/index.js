import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { reset } from 'redux-form';
import { Link } from 'react-router';

/* component styles */
import { styles } from './styles.scss';

// Do not render this if logged in. 
// Instead show a link to the dashboard (yay)

export class LoginForm extends Component {
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
    event.preventDefault();

    if (this.props.fields.email && this.props.fields.password) {
      const usr = {
        email: this.props.fields.email.value,
        password: this.props.fields.password.value
      } 
      this.props.signIn(usr);
    }

    this.props.dispatch(reset('loginForm'));

  };

  render() {
    const {
      fields: { email, password },
    } = this.props;

    if (this.props.isAuthenticated) {
      return (
        <h3>You're logged in. Go to the <Link to='/dashboard'>dashboard</Link></h3>
      );
    }


    return (

      <form className={styles} onSubmit={this.onAdd}>

        {
          this.props.loginStatusText &&         
          <div className="form-group">
            <p className="error-text">{this.props.loginStatusText}</p>
          </div>
        }

        <div className="form-group">
          <input type="text" className="form-control" placeholder="Email" {...email}/>
        </div>

        <div className="form-group">
          <input type="password" className="form-control" placeholder="Password" {...password}/>
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

LoginForm = reduxForm({
  form: 'loginForm',
  fields: ['email', 'password'],
  destroyOnUnmount: false,
})(LoginForm);

export default LoginForm;
