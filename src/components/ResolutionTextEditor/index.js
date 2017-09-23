import React, { Component } from 'react';
import { socket } from 'utils/socket';

import { Button } from 'react-toolbox/lib/button';

/* component styles */

export class ResolutionTextEditor extends Component {

  constructor(props) {
    super(props);
  }

  firepad;

  componentDidMount () {
    const { currentRes, country } = this.props;
    const resName = decodeURIComponent(this.props.params.name);

    var firepadRef = firebase.database().ref('resolutions/' + resName + "/");
    
    const isAffiliated = (
      currentRes.mainsub[country] || 
      currentRes.cosub[country] || 
      currentRes.signat[country] 
    );

    // Create CodeMirror (with lineWrapping on).
    var codeMirror = CodeMirror(document.getElementById('firepad'), {
      lineWrapping: true,
      readOnly: isAffiliated ? undefined : 'nocursor'
    });

    // Create Firepad (with rich text toolbar and shortcuts enabled).
    this.firepad = Firepad.fromCodeMirror(firepadRef, codeMirror, {
      richTextShortcuts: true,
      richTextToolbar: true,
      defaultText: 'Hello, World!'
    });
  }

  componentWillUnmount () {
    this.firepad.dispose();
  }

  render() {
    return (
      <div id="firepad" style={{'margin': '8% 12% 0% 18%', 'width': '70%', 'height': '70%'}}>

      </div>
    )

  }
}
