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
    // const resName = decodeURIComponent(this.props.params.name);
    // socket.emit("resolution approve", {token: this.props.token, name: resName});
    
  };

  render() {
    const { currentRes, creator, name } = this.props;
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


ResolutionAmender = reduxForm({
  form: 'resolutionAmender',
  fields: ['name', 'creator'],
  destroyOnUnmount: false,
})(ResolutionAmender);

export default ResolutionAmender;


