import React, { Component } from 'react';
import { socket } from 'utils/socket';
import { reduxForm } from 'redux-form';

import Input from 'react-toolbox/lib/input';
import { Button } from 'react-toolbox/lib/button';

import { styles } from '../LoginForm/styles.scss';

/* component styles */

export class ResolutionAmender extends Component {

  constructor(props) {
    super(props);
  }

  onSubmit = (event) => {
    event.preventDefault();
    
    // if (this.props.currentRes.amendments[this.props.fields.title.value]) {
    //   alert("This title has been taken for another amendment. Pick again!");
    //   return;
    // }

    // const resName = decodeURIComponent(this.props.params.name);
    // socket.emit("resolution approve", {token: this.props.token, name: resName});
    
  };

  render() {
    const { currentRes, title, message } = this.props;
    const resName = decodeURIComponent(this.props.params.name);
    const approved = currentRes.approved;

    // if (!approved) {
    //   return (
    //     <div className="text-center">
    //       <h4>This resolution must be approved before you can submit an amendment!</h4>
    //     </div>
    //   )
    // }

    return (
      <form className={styles} >
        <div className="form-group">
          <Input type="text"  placeholder="Title" {...title}/>
        </div>

        <div className="form-group">
          <Input type="text"  placeholder="Message (optional)" {...message}/>
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


