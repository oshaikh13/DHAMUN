import React, { Component } from 'react';
import DocumentMeta from 'react-document-meta';
import { socket } from 'utils/socket';

/* material UI components */
import { Button } from 'react-toolbox/lib/button';
import Input from 'react-toolbox/lib/input';
import Dialog from 'react-toolbox/lib/dialog';


/* component styles */
import { styles } from './styles.scss';

const metaData = {
  title: 'DHAMUN',
  description: 'Get started here',
  canonical: 'http://example.com/path/to/page',
  meta: {
    charset: 'utf-8',
    name: {
      keywords: 'react,meta,document,html,tags',
    },
  },
};

export class ResolutionSubmit extends Component {
 
  state = {
    active: false,
    name: ""
  };

  handleToggle = (e) => {
    e.preventDefault();
    this.setState({active: !this.state.active});
  }

  handleChange = (name, value) => {
    this.setState({...this.state, [name]: value});
  };

  createResolution = (e) => {
    e.preventDefault();
    if (!this.state.name) return;
    socket.emit('resolution create', {name: this.state.name, token: this.props.token})
    this.setState({active: !this.state.active});
  }

  actions = [
    { label: "Cancel", onClick: this.handleToggle },
    { label: "Send", onClick: this.createResolution}
  ];

  render() {

    var _this = this;
    
    return (
      <div>

        <Dialog
          actions={this.actions}
          active={this.state.active}
          onEscKeyDown={this.handleToggle}
          onOverlayClick={this.handleToggle}
          title={'New ' + this.props.dataType}
        >
          <p>Create a new {this.props.dataType.toLowerCase()} name. Make sure it's unique, or we can't create it.</p>
          <Input label={this.props.dataType + " X"} type="text" className="input" style={{top: -100}} value={this.state.name} onChange={_this.handleChange.bind(_this, 'name')}/>

        </Dialog>

        <section className={styles}>
          <div className="container">
            <Button id="resButton" className="btn" disabled={this.props.isAuthenticating} onClick={this.handleToggle}>
              Create {this.props.dataType}
            </Button>
          </div>
        </section>
      </div>
    );
  }

}
