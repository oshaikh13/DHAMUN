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
      if (this.props.userLevel === "Delegate") {   

        return (
          <h3>You're logged in. Go to the <Link to='/dashboard/delegate'>dashboard</Link></h3>
        );

      } else if (this.props.userLevel === "Chair") {

        return (
          <h3>You're logged in. Go to the <Link to='/dashboard/chair'>dashboard</Link></h3>
        );

      }
    }


    return (

    <div className={styles}>
      <form  onSubmit={this.onAdd}>

        <Card className="card">

          {
            this.props.loginStatusText &&         
            <div className="form-group">
              <p className="error-text">{this.props.loginStatusText}</p>
            </div>
          }

          <div className="form-group">
            <Input label="Email" type="text" className="input" style={{top: -100}} {...email}/>
          </div>

          <div className="form-group">
            <Input label="Password" type="password" className="input" style={{top: 100}} {...password}/>
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

LoginForm = reduxForm({
  form: 'loginForm',
  fields: ['email', 'password'],
  destroyOnUnmount: false,
})(LoginForm);

export default LoginForm;
