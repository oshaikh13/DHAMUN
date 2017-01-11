import React, { Component } from 'react';
import DocumentMeta from 'react-document-meta';
import { socket } from 'utils/socket';

/* material UI components */
import { Button } from 'react-toolbox/lib/button';

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

  addAdminPermissions(file, admin) {

    // TODO: add this in v2 of Referendum

    // gapi.client.drive.permissions
    //   .create({
    //     fileId: file.id, 
    //     role: "writer", 
    //     type: "user", 
    //     emailAddress: admin.email,
    //     sendNotificationEmail: true,
    //     emailMessage: this.props.country + "'s Resolution"
    //   })
    //   .execute(function(res){

    //   });

  }

  onFileSelect(file) {
    var _this = this;
    
    if (this.props.admins) {    
      this.props.admins.forEach(function(admin){
        _this.addAdminPermissions(file, admin);
      });
    }


    gapi.client.drive.permissions
      .create({fileId: file.id, role: "commenter", type: "anyone"})
      .execute(function(res){

      })

    gapi.client.drive.files
      .get({fileId: file.id, fields: ["webViewLink"]})
      .execute(function(res){
        socket.emit('resolution create', {link: res.webViewLink, name: file.name, token: _this.props.token})
      })

  }

  componentDidMount() {
    var _this = this;
    function initPicker() {
      var picker = new FilePicker({
        apiKey: GAPI_DEV_KEY,
        clientId: GAPI_CLIENT_ID,
        appId: GAPI_APP_ID,
        buttonEl: document.getElementById('resButton'),
        onSelect: _this.onFileSelect.bind(_this)
      }); 
    }
    initPicker();
  }

  componentWillUnmount() {
    document.getElementById('resButton').addEventListener("click", null);

  }

  render() {
    return (
      <section className={styles}>
        <div className="container">
          <Button id="resButton" className="btn" disabled={this.props.isAuthenticating} >
            Submit {this.props.dataType}
          </Button>
        </div>
      </section>
    );
  }
}
