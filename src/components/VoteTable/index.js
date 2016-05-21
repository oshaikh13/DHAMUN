import React, { Component } from 'react';
import { Link } from 'react-router';

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
        <tbody>

          {
            Object.keys(votes).map((item, index) => 
              <tr key={index}>
                <td>{item}</td>
                <td>{votes[item].closed ? "Closed" : "Open"}</td>
                <td>{votes[item].creator}</td>
                <td><a type="button" className="btn btn-primary" href={'/#/dashboard/delegate/vote/' + encodeURIComponent(item)}>Vote</a></td>
              </tr>
            )
          }

        </tbody>
      </table>
    );
  }
}