import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { reset } from 'redux-form';
import { Link } from 'react-router';
import { socket } from 'utils/socket';


/* component styles */
import { styles } from '../LoginForm/styles.scss';

import { Button } from 'react-toolbox/lib/button';
import Input from 'react-toolbox/lib/input';

export class VoteAddForm extends Component {

  constructor(props) {
    super(props);
  }

  onSubmit = (event) => {
    event.preventDefault();

    if (this.props.fields.name && this.props.fields.creator) {
      const {
        fields: { name, creator },
      } = this.props;
      
      socket.emit("vote create", {token: this.props.token, voteName: name.value, creator: creator.value});
      this.props.dispatch(reset('voteAddForm'));

    }
  };

  render() {
    const {
      fields: { name, creator },
    } = this.props;

    return (


      <form className={styles} onSubmit={this.onAdd}>
        <div className="form-group">
          <Input type="text"  placeholder="Name" {...name}/>
        </div>

        <div className="form-group">
          <Input type="text"  placeholder="Creator" {...creator}/>
        </div>

        <div className="form-group">
          <Button className="btn" onClick={(e) => this.onSubmit(e)} >
            Create Session
          </Button>
        </div>
      </form>

    );
  }
}

VoteAddForm = reduxForm({
  form: 'voteAddForm',
  fields: ['name', 'creator'],
  destroyOnUnmount: false,
})(VoteAddForm);

export default VoteAddForm;