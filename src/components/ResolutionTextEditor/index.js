import React, { Component } from 'react';
import { socket } from 'utils/socket';

import { Button } from 'react-toolbox/lib/button';

/* component styles */

export class ResolutionTextEditor extends Component {

  constructor(props) {
    super(props);
  }

  pad;
  editor;

  checkReadOnly (currentRes, userLevel, country) {
    
    const isAffiliatedChair = (currentRes.approved && userLevel == "Chair");

    const isAffiliatedUser = (
      (currentRes.mainsub[country] || 
      currentRes.cosub[country] || 
      currentRes.signat[country]) && !currentRes.approved
    ); 
    
    return (isAffiliatedChair || isAffiliatedUser) ? undefined : 'nocursor';
  }
  
  makeFirebaseSafeRef (currentRef) {
    const prohibited = [".", "#", "$", "[", "]"];
    var newRef = "";
    for (var i = 0; i < currentRef.length; i++) {
      if (prohibited.indexOf(currentRef.charAt(i)) > -1) newRef += " ";
      else newRef += currentRef.charAt(i);
    }
    return newRef;
  }

  componentDidMount () {
    debugger;
    const { currentRes, country, userLevel } = this.props;
    const resName = this.makeFirebaseSafeRef(decodeURIComponent(this.props.params.name));
    var firepadRef = firebase.database().ref('resolutions/' + this.props.committee + " " + resName + "/");
    const readOnlyStatus = this.checkReadOnly(currentRes, userLevel, country);

    var toolbarOptions = [
      ['bold', 'italic', 'underline', 'strike'],
      [{'color': []}, {'background': []}],          // dropdown with defaults from theme
      [{'align': []}],
      ['link', 'image'],
      [{'font': []}],
      ['clean']                                         // remove formatting button
    ];

    this.editor = new Quill('#editor-container', {
      modules: {
        toolbar: toolbarOptions
      },
      theme: 'snow',  // or 'bubble',
      readOnly: readOnlyStatus
    });

    this.pad = Firepad.fromQuill(firepadRef, this.editor, null);

    this.pad.on('ready', function () {
      if (this.pad.isHistoryEmpty()) {
        //setText
      }
    }.bind(this));
    
  }

  componentWillReceiveProps(nextProps) {
    const { currentRes, country, userLevel } = nextProps;
    // debugger;
    if (this.checkReadOnly(currentRes, userLevel, country)) {
      this.editor.disable();
    } else {
      this.editor.enable();
    }
  }

  componentWillUnmount() {
    this.pad.dispose();
  }

  render() {
    return (
      <div id="editor-container">

      </div>
    )

  }
}
