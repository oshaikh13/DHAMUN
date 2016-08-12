import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { reset } from 'redux-form';
import { Link } from 'react-router';

//Material UI imports
import { Button } from 'react-toolbox/lib/button';
import { Card } from 'react-toolbox/lib/card';
import Input from 'react-toolbox/lib/input';

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

    <div className={styles}>
      <form  onSubmit={this.onAdd}>

        <Card className="card">

         {
          this.props.signUpStatusText &&         
          <div className="form-group">
            <p className="error-text">{this.props.signUpStatusText}</p>
          </div>
        }

          <div className="form-group">
            <Input label="Password" type="text" className="input" {...password}/>
          </div>

          <div className="form-group">
            <Input label="Confirm Password" type="password" className="input" {...validatePassword}/>
          </div>

          <div className="form-group">
            <Button className="btn btn-default" onClick={(e) => this.onSubmit(e)} disabled={this.props.isAuthenticating} primary>
              Login
            </Button>
          </div>

        </Card>  
      </form>
    </div>  
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
