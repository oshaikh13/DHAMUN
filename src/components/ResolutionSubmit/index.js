import React, { Component } from 'react';
import DocumentMeta from 'react-document-meta';
var scriptjs = require('scriptjs');

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

  componentDidMount(){
  }

  onSubmit(e) {
    e.preventDefault();

    // Scope to use to access user's Drive items.
    var scope = ['https://www.googleapis.com/auth/drive'];

    var pickerApiLoaded = false;
    var oauthToken;

    // Use the Google API Loader script to load the google.picker script.
    function loadPicker() {
      gapi.load('auth', {'callback': onAuthApiLoad});
      gapi.load('picker', {'callback': onPickerApiLoad});
    }

    function onAuthApiLoad() {
      window.gapi.auth.authorize(
          {
            'client_id': GAPI_CLIENT_ID,
            'scope': scope,
            'immediate': false
          },
          handleAuthResult);
    }

    function onPickerApiLoad() {
      pickerApiLoaded = true;
      createPicker();
    }

    function handleAuthResult(authResult) {
      if (authResult && !authResult.error) {
        oauthToken = authResult.access_token;
        createPicker();
      }
    }

    // Create and render a Picker object for searching images.
    function createPicker() {
      if (pickerApiLoaded && oauthToken) {

        var view = new google.picker.View(google.picker.ViewId.DOCS);
        var picker = new google.picker.PickerBuilder().enableFeature(google.picker.Feature.NAV_HIDDEN)
            .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
            .setAppId(GAPI_APP_ID)
            .setOAuthToken(oauthToken)
            .addView(view)
            .addView(new google.picker.DocsUploadView())
            .setDeveloperKey(GAPI_DEV_KEY)
            .setCallback(pickerCallback)
            .build();
         picker.setVisible(true);
      }
    }

    function shareFile(id) {
      console.log(id + " picked file ID");
    }

    // A simple callback implementation.
    function pickerCallback(data) {
      if (data.action == google.picker.Action.PICKED) {
        var fileId = data.docs[0].id;
        gapi.load('drive-share', function(){
          shareFile(fileId);
        });
      }
    }

    loadPicker();

  }

  render() {
    return (
      <section>
        <div className="container">
          <button className="btn btn-default" onClick={(e) => this.onSubmit(e)} disabled={this.props.isAuthenticating} >
            Submit Resolution
          </button>
        </div>
      </section>
    );
  }
}
