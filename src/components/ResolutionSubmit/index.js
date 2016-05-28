import React, { Component } from 'react';
import DocumentMeta from 'react-document-meta';

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

  componentDidMount() {
    function initPicker() {
      var picker = new FilePicker({
        apiKey: GAPI_DEV_KEY,
        clientId: GAPI_CLIENT_ID,
        appId: GAPI_APP_ID,
        buttonEl: document.getElementById('resButton'),
        onSelect: function(file) {
          console.log(file);
          alert('Selected ' + file.name);
        }
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
