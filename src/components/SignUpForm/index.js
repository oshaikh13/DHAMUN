import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { reset } from 'redux-form';
import { Link } from 'react-router';

/* component styles */
import { styles } from './styles.scss';

// Do not render this if logged in. 
// Instead show a link to the dashboard (yay)

export class SignUpForm extends Component {
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
    
    const passMatch = (this.props.fields.password.value === this.props.fields.validatePassword.value);

    if (passMatch) {
      var usr = {
        password: this.props.fields.password.value,
        hash: this.props.params.hash
      }
      this.props.signUp(usr);
    } else {
      this.props.signUpFailure('500', 'Passwords do not match. Try again.')
    }

    this.props.dispatch(reset('signUpForm'));

  };

  render() {
    const {
      fields: { password, validatePassword },
    } = this.props;

    if (this.props.hasSignedUp) {
      return (
        <h3>You've signed up. Go <Link to='/home/login'>login</Link></h3>
      );
    }


    return (

      <form className={styles} onSubmit={this.onAdd}>
        {
          this.props.signUpStatusText &&         
          <div className="form-group">
            <p className="error-text">{this.props.signUpStatusText}</p>
          </div>
        }

        <div className="form-group">
          <input type="password" className="form-control" placeholder="Password" {...password}/>
        </div>

        <div className="form-group">
          <input type="password" className="form-control" placeholder="Confirm Password" {...validatePassword}/>
        </div>
        
        <div className="form-group">
          <button className="btn btn-default" onClick={(e) => this.onSubmit(e)} disabled={this.props.isAuthenticating} >
            Sign Up
          </button>
        </div>
      </form>
    );
  }
}

SignUpForm.contextTypes = { router: React.PropTypes.object.isRequired, store: React.PropTypes.any };

SignUpForm = reduxForm({
  form: 'authForm',
  fields: ['password', 'validatePassword'],
  destroyOnUnmount: false,
})(SignUpForm);

export default SignUpForm;
