import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { reset } from 'redux-form';
import { Link } from 'react-router';

/* material UI components */
import { Button } from 'react-toolbox/lib/button';
import { Card } from 'react-toolbox/lib/card';
import Input from 'react-toolbox/lib/input';
import Dialog from 'react-toolbox/lib/dialog';


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

  state = {
    active: false
  };

  handleToggle = (e) => {
    e.preventDefault();
    this.setState({active: !this.state.active});
  }

  sendReset = (e) => {
    e.preventDefault();
    this.setState({active: !this.state.active});
    this.props.resetPassword(this.props.fields.email.value);

  }

  actions = [
    { label: "Cancel", onClick: this.handleToggle },
    { label: "Create", onClick: this.sendReset}
  ];


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
          <div className={styles}>
            <div className="centerMe">
            <Card className="card">
              <h3>You're logged in. Go to the <Link to='/dashboard/delegate'>dashboard</Link></h3>
            </Card>
            </div>
          </div>
        );

      } else if (this.props.userLevel === "Chair") {

        return (
          <div className={styles}>
            <div className="centerMe">
            <Card className="card">
              <h3>You're logged in. Go to the <Link to='/dashboard/chair'>dashboard</Link></h3>
            </Card>
            </div>
          </div>
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
              <Input label="Email" type="text" autoCapitalize="off" className="input" style={{top: -100}} {...email}/>
            </div>

            <div className="form-group">
              <Input label="Password" autoCapitalize="off" type="password" className="input" style={{top: 100}} {...password}/>
            </div>

            <div className="form-group">
              <Button className="btn" onClick={(e) => this.onSubmit(e)} disabled={this.props.isAuthenticating} raised primary>
                Login
              </Button>
            </div>

            <Dialog
              actions={this.actions}
              active={this.state.active}
              onEscKeyDown={this.handleToggle}
              onOverlayClick={this.handleToggle}
              title='Reset Password'
            >
              <p>Enter the affiliated email address, and if it exists, we'll send you a password reset email.</p>
              <Input label="Email" type="text" className="input" style={{top: -100}} {...email}/>

            </Dialog>

            <Button className="btn" label='Forgot Password?' onClick={this.handleToggle} />

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
