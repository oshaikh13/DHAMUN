import React, { Component } from 'react';
import { socket } from 'utils/socket';
import { reduxForm } from 'redux-form';
import { reset } from 'redux-form';


import Input from 'react-toolbox/lib/input';
import Dropdown from 'react-toolbox/lib/dropdown';

import { Button } from 'react-toolbox/lib/button';
import { styles } from '../LoginForm/styles.scss';


const resolutionOptions = [
  { value: 'add', label: 'Adding material' },
  { value: 'remove', label: 'Removing material'},
];
/* component styles */

export class ResolutionAmender extends Component {

  state = {resolutionValue: 'add'};

  constructor(props) {
    super(props);
  }

  onSubmit (event) {
    event.preventDefault();
    
    debugger;

    if (!this.props.fields.title.value) {
      alert("Provide a title!");
      return;
    }

    if (this.props.currentRes.amendments && this.props.currentRes.amendments[this.props.fields.title.value]) {
      alert("This title has been taken for another amendment. Pick again!");
      return;
    }

    const resName = decodeURIComponent(this.props.params.name);
    socket.emit("resolution amendment add", 
      {
        title: this.props.fields.title.value,
        message: this.props.fields.message.value, 
        name: resName,
        creator: this.props.country,
        token: this.props.token,
        type: this.state.resolutionValue
      }
    );

    this.props.dispatch(reset('resolutionAmender'));


    alert("You've submitted an amendment!");
    
  };

  handleDropdownChange(value) {
    this.setState({resolutionValue: value})
  }

  render() {

    // const { currentRes } = this.props;
    const {
      currentRes,
      fields: { message, title },
    } = this.props;
    const resName = decodeURIComponent(this.props.params.name);
    const approved = currentRes.approved;
  
    return (
      <form className={styles} >
        <div className="form-group">
          <Input type="text"  placeholder="Title" {...title}/>
        </div>

        <div className="form-group">
          <Input type="text"  placeholder="Message (optional)" {...message}/>
        </div>

        <div className="form-group">
          <Dropdown
            auto
            onChange={this.handleDropdownChange.bind(this)}
            source={resolutionOptions}
            value={this.state.resolutionValue}
          />
        </div>

        <div className="form-group">
          <Button className="btn" onClick={(e) => this.onSubmit(e)} >
            Create Amendment
          </Button>
        </div>
      </form>
    );
  }
}


ResolutionAmender = reduxForm({
  form: 'resolutionAmender',
  fields: ['title', 'message'],
  destroyOnUnmount: false,
})(ResolutionAmender);

export default ResolutionAmender;


