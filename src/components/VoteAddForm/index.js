import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { reset } from 'redux-form';
import { Link } from 'react-router';
import { Socket } from 'components/Socket';


/* component styles */
import { styles } from '../LoginForm/styles.scss';

export class VoteAddForm extends Component {

  constructor(props) {
    super(props);
  }

  onSubmit = (event) => {
    event.preventDefault();
    if (this.props.name && this.props.creator) {
      console.log(name, creator);
    }
  };

  render() {
    const {
      fields: { name, creator },
    } = this.props;

    return (


      <form className={styles} onSubmit={this.onAdd}>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Name" {...name}/>
        </div>

        <div className="form-group">
          <input type="text" className="form-control" placeholder="Creator" {...creator}/>
        </div>

        <div className="form-group">
          <button className="btn btn-default" onClick={(e) => this.onSubmit(e)} >
            Create Session
          </button>
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