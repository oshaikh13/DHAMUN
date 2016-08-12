import React, { Component } from 'react';
import { Link } from 'react-router';
import { Button } from 'react-toolbox/lib/button';

import { styles } from '../ResolutionTable/styles.scss';


export class VoteTable extends Component {

  render() {
    const { votes } = this.props;

    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>State</th>
            <th>Opened by</th>
            
          </tr>
        </thead>
        <tbody className={styles} >

          {
            Object.keys(votes).map((item, index) => 
              <tr key={index}>
                <td className="col-md-3">{item}</td>
                <td className="col-md-3">{votes[item].closed ? "Closed" : "Open"}</td>
                <td className="col-md-3">{votes[item].creator}</td>
                <td className="col-md-3">
                  <Button label="Vote" className="btn centerMe" href={'/#/dashboard/' + this.props.userLevel + '/vote/' + encodeURIComponent(item)} primary/>
                </td>
              </tr>
            )
          }

        </tbody>
      </table>
    );
  }
}