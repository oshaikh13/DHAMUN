import React, { Component } from 'react';
import DocumentMeta from 'react-document-meta';
import { socket } from 'utils/socket';

/* components */

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

  onFileSelect(file) {
    debugger;
    gapi.client.drive.permissions
      .create({fileId: file.id, role: "commenter", type: "anyone"})
      .execute(function(res){

      })

    gapi.client.drive.files
      .get({fileId: file.id, fields: ["webViewLink"]})
      .execute(function(res){

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
        onSelect: _this.onFileSelect
      }); 
    }
    initPicker();
  }

  componentWillUnmount() {
    document.getElementById('resButton').addEventListener("click", null);

  }

  render() {
    return (
      <section>
        <div className="container">
          <button id="resButton" className="btn btn-default" disabled={this.props.isAuthenticating} >
            Submit Resolution
          </button>
        </div>
      </section>
    );
  }
}
