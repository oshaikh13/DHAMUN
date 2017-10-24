import React, { Component } from 'react';
import { socket } from 'utils/socket';

import { Button } from 'react-toolbox/lib/button';

/* component styles */

export class ResolutionTextEditor extends Component {

  constructor(props) {
    super(props);
  }

  firepad;
  codeMirror;

  checkReadOnly (currentRes, userLevel, country) {
    
    const isAffiliatedChair = (currentRes.approved && userLevel == "Chair");

    const isAffiliatedUser = (
      (currentRes.mainsub[country] || 
      currentRes.cosub[country] || 
      currentRes.signat[country]) && !currentRes.approved
    ); 
    
    return (isAffiliatedChair || isAffiliatedUser) ? undefined : 'nocursor';
  }

  componentDidMount () {
    const { currentRes, country, userLevel } = this.props;
    const resName = decodeURIComponent(this.props.params.name);

    var firepadRef = firebase.database().ref('resolutions/' + resName + "/");
    const readOnlyStatus = this.checkReadOnly(currentRes, userLevel, country);
    // Create CodeMirror (with lineWrapping on).
    this.codeMirror = CodeMirror(document.getElementById('firepad'), {
      lineWrapping: true,
      readOnly: readOnlyStatus
    });

    // Create Firepad (with rich text toolbar and shortcuts enabled).
    this.firepad = Firepad.fromCodeMirror(firepadRef, this.codeMirror, {
      richTextShortcuts: true,
      richTextToolbar: true,
      defaultText: 'Hello, World!'
    });
  }

  componentWillReceiveProps(nextProps) {
    const { currentRes, country, userLevel } = nextProps;
    // debugger;
    this.codeMirror.setOption('readOnly', this.checkReadOnly(currentRes, userLevel, country));
  }

  componentWillUnmount() {
    this.firepad.dispose();
  }

  render() {
    return (
      <div id="firepad" style={{'margin': '8% 12% 0% 18%', 'width': '70%', 'height': '70%'}}>

      </div>
    )

  }
}
