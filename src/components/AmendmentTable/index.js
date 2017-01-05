import React, { Component } from 'react';
import { Link } from 'react-router';
import { Button } from 'react-toolbox/lib/button';

import { styles } from '../ResolutionTable/styles.scss';


export class AmendmentTable extends Component {

  render() {

    var { amendments } = this.props.currentRes;

    if (!amendments) amendments = {};
    // debugger;

    var typeDesc = {
      'add' : 'Adding Material',
      'remove': 'Removing Material'
    }

    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Title</th>
            <th>Message</th>
            <th>Creator</th>
            <th>Adding or Removing</th>
            
          </tr>
        </thead>
        <tbody className={styles} >

          {


            Object.keys(amendments).map((item, index) => 
              <tr key={index}>
                <td className="col-md-3">{amendments[item].title}</td>
                <td className="col-md-3">{amendments[item].message}</td>
                <td className="col-md-3">{amendments[item].creator}</td>
                <td className="col-md-3">{typeDesc[amendments[item].type]}</td>
              </tr>
            )
          }

        </tbody>
      </table>
    );
  }
}